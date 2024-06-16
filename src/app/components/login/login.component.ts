import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/AuthService/authentication.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  auth: AuthenticationService = inject(AuthenticationService);
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  formBuilder: FormBuilder = inject(FormBuilder);
  submitted = false;

  constructor() {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const submitEmail = this.form.value.email ?? '';
    const submitPassword = this.form.value.password ?? '';
    this.auth.login(submitEmail, submitPassword);
    console.log(JSON.stringify(this.form.value, null, 2));
  }
}
