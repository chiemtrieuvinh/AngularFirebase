import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/TaskService/task.service';
import { SortDirection, Task } from '../../../interfaces/task';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, MatIconModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  toastr: ToastrService = inject(ToastrService);
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
  currentSort: any = SortDirection.ASC;
  constructor() {
    this.dataSource = this.taskService.taskList;
  }

  ngOnInit() {
    this.fetchAllTask();
    this.taskService.fetchParams.subscribe((data) => {
      this.currentSort = data.sort;
    });
  }
  onHandleSort(current: SortDirection.ASC | SortDirection.DESC) {
    this.taskService.onSort(current);
  }
  async fetchAllTask() {
    try {
      await this.taskService.getAllTasks();
    } catch (err: any) {
      this.toastr.error(err.message);
    }
  }

  navigateToUpdate(task: Task) {
    this.router.navigate([`/tasks/${task.id}/update`]);
  }

  // async onSort() {
  //   try {
  //     if (this.sortDirection === SortDirection.ASC) {
  //       this.sortDirection = SortDirection.DESC;
  //       const submitSearch = this.form.value.search ?? '';
  //       const submitFilter = this.form.value.filter ?? StatusValue.ALL;
  //       const params = {
  //         search: submitSearch,
  //         filter: submitFilter,
  //         sort: SortDirection.DESC,
  //       };
  //       await this.taskService.filterStatusAndSearch(params);
  //       return;
  //     } else {
  //       this.sortDirection = SortDirection.ASC;
  //       const submitSearch = this.form.value.search ?? '';
  //       const submitFilter = this.form.value.filter ?? StatusValue.ALL;
  //       const params = {
  //         search: submitSearch,
  //         filter: submitFilter,
  //         sort: SortDirection.ASC,
  //       };
  //       await this.taskService.filterStatusAndSearch(params);
  //       return;
  //     }
  //   } catch (err: any) {
  //     this.toastr.error(err.message);
  //   }
  // }
}
