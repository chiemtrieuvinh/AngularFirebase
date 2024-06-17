import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  fireauth: AngularFireAuth = inject(AngularFireAuth);
  router: Router = inject(Router);
  isAuthorized: boolean = false;
  private AuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  public showNavbar = this.AuthenticatedSubject.asObservable();
  constructor() {}

  getAuthorization() {
    return this.isAuthorized;
  }

  getAuthentication() {
    return this.AuthenticatedSubject.asObservable();
  }

  updateAuthentication(value: boolean) {
    this.AuthenticatedSubject.next(value);
  }
  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.isAuthorized = true;
        this.updateAuthentication(true);
        this.router.navigate(['dashboard']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      }
    );
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      () => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      }
    );
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.isAuthorized = false;
        this.updateAuthentication(false);
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }
}
