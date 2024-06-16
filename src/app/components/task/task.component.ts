import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/TaskService/task.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  taskService: TaskService = inject(TaskService);

  taskList: any[] = [];
  taskObj: any = {
    id: '',
    title: '',
    description: '',
  };
  id: string = '';
  title: string = '';
  description: string = '';
  constructor() {}

  getAllTasks() {
    this.taskService.getAllTasks().subscribe(
      (res) => {
        this.taskList = res.map((e: any) => {
          const data = e.payload.doc.data();
          data.id = e.payload.doc.id;
          return data;
        });
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  addTask() {
    if (this.title === '' || this.description === '') {
      alert('fill all the input fields');
    }

    this.taskObj.id = this.id;
    this.taskObj.title = this.title;
    this.taskObj.description = this.description;

    this.taskService.addTask(this.taskObj);
    this.resetForm();
  }

  updateTask() {}

  deleteTask(task: any) {
    if (window.confirm('Are you sure you want to delete' + task.title))
      this.taskService.deleteTask(task);
  }

  resetForm() {
    this.id = '';
    this.title = '';
    this.description = '';
  }
}
