import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CurrentUser, User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  firestore: AngularFirestore = inject(AngularFirestore);
  fireauth: AngularFireAuth = inject(AngularFireAuth);
  router: Router = inject(Router);
  isAuthorized: boolean = false;
  defaultCurrentUser = {
    uid: '',
    email: '',
    displayName: ''
  }
  private CurrentUserSubject: BehaviorSubject<CurrentUser> = new BehaviorSubject<CurrentUser>(this.defaultCurrentUser);
  private AuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);
  private UserSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );
  public showNavbar = this.AuthenticatedSubject.asObservable();
  public users = this.UserSubject.asObservable();
  public currentUser = this.CurrentUserSubject.asObservable()

  constructor() {
    this.fireauth.onAuthStateChanged((user) => {
      if (user) {
        let foundUser:any = {}
        this.users.subscribe((data) => {
          foundUser = data.find((item) => {
           return  item.email === user.email
          })
          const userInfo = {
            uid: foundUser?.id ?? '',
            email: user.email ?? '',
            username: foundUser?.username
          }
          this.CurrentUserSubject.next(userInfo)
        })
      } else {
        console.log('not login');
      }
    })
  }
  ngOnInit(){
    this.getAllUsers();
  }
  getAuthorization() {
    return this.isAuthorized;
  }

  getAuthentication() {
    return this.AuthenticatedSubject.asObservable();
  }

  updateAuthentication(value: boolean) {
    this.AuthenticatedSubject.next(value);
  }

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

  addUser(user: User) {
    return this.firestore.collection('/Users').add(user);
  }

  async getAllUsers() {
    await this.firestore
      .collection('/Users')
      .snapshotChanges()
      .subscribe({
        next: (data) => {
          let userList: User[] = data.map((item: any) => {
            let user = item.payload.doc.data();
            return {
              id: item.payload.doc.id,
              ...user,
            };
          });
          this.UserSubject.next(userList);
        },
      });
  }

  getUserDetail(id: string) {
    return this.firestore.collection('Users').doc(id).get();
  }

  async updateUser(user: CurrentUser) {
    const updatePayload = {
      email: user.email,
      username: user.username,
    };

    return await this.firestore
      .collection('/Users')
      .doc(user.uid)
      .update(updatePayload);
  }


  register(params: User) {
    this.fireauth.createUserWithEmailAndPassword(params.email, params.password).then(
      () => {
        alert('Registration Successful');
        this.addUser(params)
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
