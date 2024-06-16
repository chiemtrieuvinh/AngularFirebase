import { Injectable, inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  firestore: AngularFirestore = inject(AngularFirestore);

  constructor() {}

  // getAllTasks
  getAllTasks() {
    return this.firestore.collection('/Tasks').snapshotChanges();
  }
  // add Task
  addTask(task: any) {
    task.id = this.firestore.createId();
    return this.firestore.collection('/Tasks').add(task);
  }
  // update Task
  updateTask(task: any) {
    // task.id = this.firestore.createId()
    // return this.firestore.collection(`/Tasks/${task.id}`)
    this.deleteTask(task);
    this.addTask(task);
  }
  // delete Task
  deleteTask(task: any) {
    return this.firestore.doc(`/Tasks/${task.id}`).delete();
  }
}
