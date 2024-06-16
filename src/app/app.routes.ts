import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { TaskComponent } from './components/task/task.component';
import { TaskDetailComponent } from './components/task/task-detail/task-detail.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login page',
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    title: 'Sign up page',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard page',
  },
  {
    path: 'tasks',
    component: TaskComponent,
    title: 'Task page',
  },
  {
    path: 'tasks/:id',
    component: TaskDetailComponent,
    title: 'Task detail page',
  },
];
