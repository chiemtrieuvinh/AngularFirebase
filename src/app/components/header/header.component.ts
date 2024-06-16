import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/AuthService/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  auth: AuthenticationService = inject(AuthenticationService);
  constructor() {}

  logout() {
    this.auth.logout();
  }
}
