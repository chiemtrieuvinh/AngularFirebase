import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/TaskService/task.service';
import { Task } from '../../../interfaces/task';
import { Router } from '@angular/router';

@Component({
  selector: 'tr[app-task-item]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
  @Input() task!: Task;
  router: Router = inject(Router);
  taskService: TaskService = inject(TaskService);
  constructor(){}

  navigateToDetailPage(task:Task) {
    this.router.navigate([`/tasks/${task.id}`])
  }

  navigateToUpdate(task:Task) {
    this.router.navigate([`/tasks/${task.id}/update`])
  }

  onDelete(id:string) {
    this.taskService.deleteTask(id)
  }
}