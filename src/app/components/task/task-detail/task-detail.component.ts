import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../../services/TaskService/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MappedPriority,
  MappedStatus,
  PriorityValue,
  StatusValue,
} from '../../../interfaces/task';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
})
export class TaskDetailComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  taskService: TaskService = inject(TaskService);
  router: Router = inject(Router);

  taskDetail = {
    title: '',
    description: '',
    dueDate: '',
    status: MappedStatus[StatusValue.NEW],
    priority: MappedPriority[PriorityValue.LOW],
    assignees: [],
  };
  convertedStatus!: string;
  convertedPriority!: string;
  convertedTime!: string;
  get currentTaskId() {
    return this.activatedRoute.snapshot.params['id'];
  }
  ngOnInit() {
    this.taskService.getTaskDetail(this.currentTaskId).subscribe((res: any) => {
      const response = res.data();
      this.taskDetail = response;
      this.convertedStatus = MappedStatus[response.status];
      this.convertedPriority = MappedPriority[response.priority];
      const time = new Date(response.dueDate);
      this.convertedTime = `${time.getDay()}-${time.getMonth()}-${time.getFullYear()}`;
    });
  }

  backToTaskList() {
    this.router.navigate(['/tasks']);
  }
}
