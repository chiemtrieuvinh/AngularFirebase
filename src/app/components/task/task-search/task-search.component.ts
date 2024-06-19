import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  FilterStatusOptions,
  Option,
  SortDirection,
  StatusValue,
} from '../../../interfaces/task';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../../services/TaskService/task.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-task-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
  ],
  templateUrl: './task-search.component.html',
  styleUrl: './task-search.component.scss',
})
export class TaskSearchComponent {
  toastr: ToastrService = inject(ToastrService);
  taskService: TaskService = inject(TaskService);
  statusOptions: Option[] = FilterStatusOptions;
  form = new FormGroup({
    filter: new FormControl(StatusValue.ALL),
    search: new FormControl(''),
  });
  formBuilder: FormBuilder = inject(FormBuilder);
  submitted = false;
  currentSort: any = SortDirection.ASC;
  constructor() {}
  ngOnInit() {
    this.taskService.fetchParams.subscribe((data) => {
      this.currentSort = data.sort;
    });
  }
  async onSubmit() {
    try {
      this.submitted = true;

      if (this.form.invalid) {
        return;
      }
      const submitSearch = this.form.value.search ?? '';
      const submitFilter = this.form.value.filter ?? StatusValue.ALL;
      const submitSort = this.currentSort;
      const params = {
        search: submitSearch,
        filter: submitFilter,
        sort: submitSort,
      };
      await this.taskService.filterStatusAndSearch(params);
    } catch (err: any) {
      this.toastr.error(err.message);
    }
  }
}
