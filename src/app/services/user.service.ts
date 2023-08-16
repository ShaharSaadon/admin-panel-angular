import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getCurrentUser() {
    return this.http.get('http://localhost:4000/api/v1/auth/me', {
      withCredentials: true,
    });
  }
}
