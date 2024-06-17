import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/AuthService/authentication.service';
import { publicRoutes } from './app.routes';

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
  router: Router = inject(Router);
  title = 'angular-tasks-assignment';
  showNavbar: boolean = true;
  constructor() {
    this.router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        if(publicRoutes.includes(val.url)) {
          this.showNavbar = false
        } else {
          this.showNavbar = true
        }
      }
    })
  }
}
