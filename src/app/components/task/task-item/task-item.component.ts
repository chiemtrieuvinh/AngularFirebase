import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/TaskService/task.service';
import { MappedStatus, MappedPriority, Task } from '../../../interfaces/task';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tr[app-task-item]',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.scss',
})
export class TaskItemComponent {
  @Input() task!: Task;
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);
  taskService: TaskService = inject(TaskService);
  convertedStatus!: string;
  convertedPriority!: string;
  convertedTime!: string;
  constructor() {}

  ngOnInit() {
    this.convertedStatus = MappedStatus[this.task.status];
    this.convertedPriority = MappedPriority[this.task.priority];
    const time = new Date(this.task.dueDate);
    this.convertedTime = `${time.getDay()}-${time.getMonth()}-${time.getFullYear()}`;
  }

  navigateToDetailPage(task: Task) {
    this.router.navigate([`/tasks/${task.id}`]);
  }

  navigateToUpdate(task: Task) {
    this.router.navigate([`/tasks/${task.id}/update`]);
  }

  async onDelete(id: string) {
    try {
      this.taskService.deleteTask(id);
    } catch (err: any) {
      this.toastr.error(err.message);
    }
  }
}
