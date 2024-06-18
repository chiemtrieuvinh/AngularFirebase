import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/TaskService/task.service';
import { Task } from '../../../interfaces/task';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TaskItemComponent } from '../task-item/task-item.component';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  router: Router = inject(Router);
  taskService: TaskService = inject(TaskService);

  displayedColumns: string[] = [
    'Id',
    'Title',
    'Description',
    'Due Date',
    'Status',
    'Priority',
    'Assignees',
    'Actions',
  ];
  dataSource: Observable<Task[]>;
  constructor() {
    this.dataSource = this.taskService.taskList;
  }
  ngOnInit() {
    this.taskService.getAllTasks();
  }

  navigateToUpdate(task: Task) {
    this.router.navigate([`/tasks/${task.id}/update`]);
  }

  onDelete(id: string) {
    this.taskService.deleteTask(id);
  }
}
