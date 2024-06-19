import { Component, inject } from '@angular/core';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatCardModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  auth: AuthenticationService = inject(AuthenticationService);
  form = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });
  formBuilder: FormBuilder = inject(FormBuilder);
  submitted = false;
  constructor() {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
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

    const submitUsername = this.form.value.username ?? '';
    const submitEmail = this.form.value.email ?? '';
    const submitPassword = this.form.value.password ?? '';
    const params = {
      email: submitEmail,
      username: submitUsername,
      password: submitPassword
    }
    this.auth.register(params);
    console.log(JSON.stringify(this.form.value, null, 2));
  }
}
