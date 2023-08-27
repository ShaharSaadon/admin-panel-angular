import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router: Router) {
    // Initialize user state from sessionStorage
    const savedUser = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER);
    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser));
    }
    // this.checkUserAuthentication();
  }

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  private checkUserAuthentication() {
    this.http.get('http://localhost:4000/api/v1/auth/user').subscribe(
      (user) => {
        this.setUser(user);
      },
      (error) => {
        if (error.status === 401) {
          // Handle unauthorized error
          console.warn('User is not authenticated. Redirecting to login...');
          this.router.navigate(['/login']);
        } else {
          console.error('Error fetching user:', error);
        }
      }
    );
  }
  setUser(user: any) {
    const userToStore = {
      _id: user.id,
      fullname: user.fullname,
      email: user.username,
    };
    this.userSubject.next(userToStore);
    // Save user state to sessionStorage
    sessionStorage.setItem(
      STORAGE_KEY_LOGGEDIN_USER,
      JSON.stringify(userToStore)
    );
  }
  login(userData: any) {
    return this.http
      .post('http://localhost:4000/api/v1/auth/login', userData, {
        withCredentials: true,
      })
      .pipe(
        tap((response: any) => {
          if (response && response.user) {
            this.setUser(response.user);
          }
        })
      );
  }

  logout() {
    // Clear user data from sessionStorage
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER);

    // Update the BehaviorSubject to reflect the logout
    this.userSubject.next(null);

    // Inform the server about the logout
    // (Assuming you have an endpoint on your server to handle logout)
    this.http
      .post(
        'http://localhost:4000/api/v1/auth/logout',
        {},
        { withCredentials: true }
      )
      .subscribe({
        next: (response: any) => {
          console.log('Logged out successfully:', response);
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Logout error:', error.error);
        },
      });
  }
}
