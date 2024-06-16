import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/AuthService/authentication.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatSlideToggleModule,
    HeaderComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  auth: AuthenticationService = inject(AuthenticationService);
  title = 'angular-tasks-assignment';
  showNavbar: boolean = true;
  constructor() {}

  ngOnInit() {
    this.auth.showNavbar.subscribe((data) => {
      this.showNavbar = data;
    });
  }
}
