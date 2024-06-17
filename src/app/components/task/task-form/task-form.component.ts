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

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatCardModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  router: Router = inject(Router);
  taskService: TaskService = inject(TaskService);
  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(false),
    priority: new FormControl(0),
  });
  formBuilder: FormBuilder = inject(FormBuilder);
  submitted = false;
  isUpdate = false

  constructor() {

  }
  ngOnInit() {
    if (this.currentTaskId) {
      this.isUpdate = true
      this.taskService.getTaskDetail(this.currentTaskId).subscribe((res) => {
        this.form.patchValue(res?.data() ?? {})
      })
    } else {
      this.isUpdate = false
    }
  }
  get currentTaskId() {
    return this.activatedRoute.snapshot.params['id']
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
      const date = new Date()
      const submitTitle = this.form.value.title ?? '';
      const submitDescription = this.form.value.description ?? '';
      const submitStatus = this.form.value.status ?? false;
      const submitPriority = this.form.value.priority ?? 0;
      const submitCreatedDate = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;
      const params = {
        title: submitTitle,
        description: submitDescription,
        createdDate: submitCreatedDate,
        status: submitStatus,
        priority: submitPriority,
      }
      if (this.isUpdate) {
        await this.taskService.updateTask({
          ...params,
          id: this.currentTaskId
        });
      } else {
        await this.taskService.addTask(params);
      }
      this.onReset()
      this.router.navigate(['/tasks'])
    } catch (err: any) {
      alert(err.message)
    }
  }

  onReset(): void {
    this.form.reset()
  }
}
