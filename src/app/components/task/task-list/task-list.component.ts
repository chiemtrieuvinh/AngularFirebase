import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/TaskService/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  taskService: TaskService = inject(TaskService);

  displayedColumns: string[] = [
    'Id',
    'Title',
    'Description',
    'Created Date',
    'Status',
    'Priority',
    'Actions',
  ];
  dataSource: PeriodicElement[] = [];
  constructor() {}
  ngOnInit() {
    this.fetchAll();
  }
  fetchAll() {
    this.taskService.getAllTasks().subscribe({
      next: (data) => {
        this.dataSource = [];
        data.forEach((item: any) => {
          let task = item.payload.doc.data();
          this.dataSource.push({
            id: item.payload.doc.id,
            title: task.title,
            description: task.description,
            createdDate: task.createdDate,
            status: task.status,
            priority: task.priority,
          });
        });
      },
    });
  }
}

export interface PeriodicElement {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  status: string;
  priority: number;
}
