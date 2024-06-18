import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/TaskService/task.service';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskListComponent, TaskFormComponent, TaskSearchComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  router: Router = inject(Router);
  taskService: TaskService = inject(TaskService);
  constructor() {}
  handleNavigation() {
    this.router.navigate(['/tasks/add']);
  }
}
