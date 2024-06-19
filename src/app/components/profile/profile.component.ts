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
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, MatCardModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);
  auth: AuthenticationService = inject(AuthenticationService);
  form = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
  });
  formBuilder: FormBuilder = inject(FormBuilder);
  submitted = false;
  currentUID: string = ''
  constructor() {
 
  }

  ngOnInit(): void {
    this.fetchAllUsers();
    this.form = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });

    this.auth.currentUser.subscribe((data) => {
      this.form.patchValue(data);
      this.currentUID = data.uid
    })
  }
  async fetchAllUsers() {
    try {
      await this.auth.getAllUsers()
    } catch (err:any) {
      this.toastr.error(err.message);
    }
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
  
      const submitUsername = this.form.value.username ?? '';
      const submitEmail = this.form.value.email ?? '';
      const params = {
        uid: this.currentUID,
        email: submitEmail,
        username: submitUsername,
      }
      await this.auth.updateUser(params);
      this.toastr.success('Profile is updated successfully !');
      console.log(JSON.stringify(this.form.value, null, 2));
      this.router.navigate(['/tasks']);

    } catch(err: any) {
      this.toastr.error(err.message);

    }
   
  }
}
