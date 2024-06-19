import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SortDirection, StatusValue, Task } from '../../interfaces/task';
import { BehaviorSubject, Observable } from 'rxjs';
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

  private ParamsSubject: BehaviorSubject<ParamsSubject> =
    new BehaviorSubject<ParamsSubject>({
      search: '',
      filter: StatusValue.ALL,
      sort: SortDirection.ASC,
    });

  public taskList = this.TaskSubject.asObservable();
  public fetchParams = this.ParamsSubject.asObservable();

  constructor() {}

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
    await this.filterStatusAndSearch({
      filter: 'all',
      search: '',
      sort: SortDirection.ASC,
    });
    // await this.firestore
    //   .collection('/Tasks')
    //   .snapshotChanges()
    //   .subscribe({
    //     next: (data) => {
    //       let taskList: Task[] = data.map((item: any) => {
    //         let task = item.payload.doc.data();
    //         return {
    //           id: item.payload.doc.id,
    //           ...task,
    //         };
    //       });
    //       this.TaskSubject.next(taskList);
    //     },
    //   });
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
    // const snapshot = await statusRef.ref
    //   .where('status', '==', params?.filter)
    //   .where('title', '==', params?.search)
    //   .where('description', '==', params?.search ?? '')
    //   .get();
    const snapshot = await statusRef.ref.orderBy('priority', params.sort).get();
    // statusRef.ref.where()
    // const snapshot = await statusRef.ref
    // .where(      Filter.or(
    //   Filter.where('capital', '==', true),
    //   Filter.where('population', '>=', 1000000)
    // ))

    // .get();
    // Filter.or(
    //   Filter.where('capital', '==', true),
    //   Filter.where('population', '>=', 1000000)
    // )
    const snapshotAll = await statusRef.ref
      .orderBy('priority', params.sort)
      .get();
    if (params?.filter === StatusValue.ALL) {
      if (params.search) {
        console.log(params.search, snapshot.docs, 'check search');
        const result: any = snapshot.docs.map((doc: any) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        this.TaskSubject.next(result);
        return;
      }
      const result: any = snapshotAll.docs.map((doc: any) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      this.TaskSubject.next(result);
      return;
    } else {
      if (snapshot.empty) {
        this.TaskSubject.next([]);
        throw new Error('Data not found !');
      }
      const result: any = snapshot.docs.map((doc: any) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      this.TaskSubject.next(result);
    }
  }
}
