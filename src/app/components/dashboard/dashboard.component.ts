import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/AuthService/authentication.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  auth: AuthenticationService = inject(AuthenticationService);

  constructor() {}

  logout() {
    this.auth.logout();
  }
}
