import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {}

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    const userToStore = {
      _id: user.id,
      fullname: user.fullname,
      email: user.username,
    };
    sessionStorage.setItem(
      STORAGE_KEY_LOGGEDIN_USER,
      JSON.stringify(userToStore)
    );
    this.userSubject.next(userToStore);
  }
  login(userData: any) {
    return this.http
      .post('http://localhost:4000/api/v1/auth/login', userData, {
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          if (response && response.user) {
            this.router.navigate(['/secret']);
            this.setUser(response.user);
          }
        })
      );
  }
}
