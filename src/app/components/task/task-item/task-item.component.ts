import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/TaskService/task.service';
import { Task } from '../../../interfaces/task';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'tr[app-task-item]',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  router: Router = inject(Router);
  taskService: TaskService = inject(TaskService);
  constructor() {}

  navigateToDetailPage(task: Task) {
    this.router.navigate([`/tasks/${task.id}`]);
  }

  navigateToUpdate(task: Task) {
    this.router.navigate([`/tasks/${task.id}/update`]);
  }

  onDelete(id: string) {
    this.taskService.deleteTask(id);
  }
}
