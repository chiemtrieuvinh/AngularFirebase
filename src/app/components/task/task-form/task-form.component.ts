import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { TaskService } from '../../../services/TaskService/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  StatusOptions,
  Option,
  PriorityOptions,
  StatusValue,
  PriorityValue,
} from '../../../interfaces/task';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);
  taskService: TaskService = inject(TaskService);
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl('new'),
    priority: new FormControl(0),
    dueDate: new FormControl(new Date()),
    assignees: new FormControl([]),
  });
  formBuilder: FormBuilder = inject(FormBuilder);
  submitted = false;
  isUpdate = false;
  statusOptions: Option[] = StatusOptions;
  priorityOptions: Option[] = PriorityOptions;
  toppings = new FormControl('');
  toppingList: string[] = [
    'Extra cheese',
    'Mushroom',
    'Onion',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];
  constructor() {}
  ngOnInit() {
    if (this.currentTaskId) {
      this.isUpdate = true;
      this.taskService.getTaskDetail(this.currentTaskId).subscribe((res) => {
        this.form.patchValue(res?.data() ?? {});
      });
    } else {
      this.isUpdate = false;
    }
  }

  get currentTaskId() {
    return this.activatedRoute.snapshot.params['id'];
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  async onSubmit() {
    try {
      this.submitted = true;

      if (this.form.invalid) {
        return;
      }
      const submitTitle = this.form.value.title ?? '';
      const submitDescription = this.form.value.description ?? '';
      const submitStatus = this.form.value.status ?? StatusValue.ALL;
      const submitPriority = this.form.value.priority ?? PriorityValue.LOW;
      const submitDueDate = String(this.form.value.dueDate) ?? '';
      const submitAssignees = this.form.value.assignees ?? [];
      const params = {
        title: submitTitle,
        description: submitDescription,
        dueDate: submitDueDate,
        status: submitStatus,
        priority: submitPriority,
        assignees: submitAssignees,
      };
      if (this.isUpdate) {
        await this.taskService.updateTask({
          ...params,
          id: this.currentTaskId,
        });
        this.toastr.success('Updated successfully !');
      } else {
        await this.taskService.addTask(params);
        this.toastr.success('Created successfully !');
      }
      this.onReset();
      this.router.navigate(['/tasks']);
    } catch (err: any) {
      this.toastr.error(err.message);
    }
  }

  onReset(): void {
    this.form.reset();
  }
}
