import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Task } from '../../interfaces/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  firestore: AngularFirestore = inject(AngularFirestore);
  private TaskSubject: BehaviorSubject<Task[]> =
    new BehaviorSubject<Task[]>([]);
  public taskList = this.TaskSubject.asObservable();

  constructor() { }

  getAllTasks() {
    this.firestore.collection('/Tasks').snapshotChanges().subscribe({
      next: (data) => {
        let taskList: Task[] = data.map((item: any) => {
          let task = item.payload.doc.data();
          return {
            id: item.payload.doc.id,
            ...task
          }
        });
        this.TaskSubject.next(taskList)
      },
    });
  }
  
  getTaskDetail(id: string) {
    return this.firestore.collection('Tasks').doc(id).get()
  }

  addTask(task: Task) {
    return this.firestore.collection('/Tasks').add(task);
  }
  
  updateTask(task: Task) {
    const updatePayload = {
      title: task.title,
      description: task.description,
      createdDate: task.dueDate,
      status: task.status,
      priority: task.priority,
      assignees: task.assignees
    }
    return this.firestore.collection('/Tasks').doc(task?.id).update(updatePayload)
  }
  
  deleteTask(id: string) {
    return this.firestore.doc(`/Tasks/${id}`).delete();
  }
}
