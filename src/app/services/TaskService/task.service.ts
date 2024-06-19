import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SortDirection, StatusValue, Task } from '../../interfaces/task';
import { BehaviorSubject } from 'rxjs';
interface ParamsSubject {
  search?: string;
  filter?: string;
  sort?: SortDirection.ASC | SortDirection.DESC;
}
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  firestore: AngularFirestore = inject(AngularFirestore);
  private TaskSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );
  defaultParams: ParamsSubject = {
    search: '',
    filter: StatusValue.ALL,
    sort: SortDirection.ASC,
  }
  private ParamsSubject: BehaviorSubject<ParamsSubject> =
    new BehaviorSubject<ParamsSubject>(this.defaultParams);

  public taskList = this.TaskSubject.asObservable();
  public fetchParams = this.ParamsSubject.asObservable();

  constructor() { }

  onSort(currentSort: SortDirection.ASC | SortDirection.DESC) {
    let newParams = {};
    if (currentSort === SortDirection.ASC) {
      this.fetchParams.subscribe((data) => {
        newParams = {
          ...data,
          sort: SortDirection.DESC,
        };
      });
      this.ParamsSubject.next(newParams);
    } else {
      this.fetchParams.subscribe((data) => {
        newParams = {
          ...data,
          sort: SortDirection.ASC,
        };
      });
      this.ParamsSubject.next(newParams);
    }
    this.filterStatusAndSearch(newParams);
  }
  async getAllTasks() {
    await this.filterStatusAndSearch(this.defaultParams);
  }

  getTaskDetail(id: string) {
    return this.firestore.collection('Tasks').doc(id).get();
  }

  async addTask(task: Task) {
    return await this.firestore.collection('/Tasks').add(task);
  }

  async updateTask(task: Task) {
    const updatePayload = {
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      assignees: task.assignees,
    };
    return await this.firestore
      .collection('/Tasks')
      .doc(task?.id)
      .update(updatePayload);
  }

  async deleteTask(id: string) {
    return await this.firestore.doc(`/Tasks/${id}`).delete();
  }

  async filterStatusAndSearch(params: {
    filter?: string;
    search?: string;
    sort?: any;
  }) {
    this.ParamsSubject.next(params);
    const statusRef = this.firestore.collection('Tasks');
    let snapshot = await statusRef.ref.orderBy('priority', params.sort)
    if (params?.filter !== StatusValue.ALL) {
      snapshot = snapshot.where('status', '==', params?.filter)
    }
    if (params?.search) {
      snapshot = snapshot.where('title', '==', params?.search)
    }

    const snapshot1 = await snapshot.get()

    if (snapshot1.empty) {
      this.TaskSubject.next([]);
      throw new Error('Data not found !');
    }
    const result: any = snapshot1.docs.map((doc: any) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    this.TaskSubject.next(result);
  }
}
