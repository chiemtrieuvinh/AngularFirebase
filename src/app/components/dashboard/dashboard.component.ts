import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/AuthService/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  router: Router = inject(Router);

  constructor() {}

  navigate() {
    this.router.navigate(['/tasks']);
  }
}
