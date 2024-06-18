import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../../services/TaskService/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../../interfaces/task';

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
  taskDetail: Task = {
    title: '',
    description: '',
    createdDate: '',
    status: false,
    priority: 0,
  };
  get currentTaskId() {
    return this.activatedRoute.snapshot.params['id'];
  }
  ngOnInit() {
    this.taskService.getTaskDetail(this.currentTaskId).subscribe((res: any) => {
      this.taskDetail = res.data();
    });
  }

  backToTaskList() {
    this.router.navigate(['/tasks']);
  }
}
