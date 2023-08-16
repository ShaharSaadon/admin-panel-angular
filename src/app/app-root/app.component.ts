import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user: any = null;

  constructor(private http: HttpClient, private UserService: UserService) {}

  ngOnInit(): void {
    this.UserService.getCurrentUser().subscribe({
      next: (response: any) => {
        this.UserService.setUser(response.user); // Set the user data
      },
      error: (error: any) => {
        console.error('Error fetching user data:', error);
      },
    });

    const newLocal = this;
    newLocal.UserService.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    console.log('logout frontend');
    this.http
      .get('http://localhost:4000/api/v1/auth/logout', {
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          console.log('Logged out successfully', response);
        },
        error: (error: any) => {
          console.error('Error logging out', error);
        },
      });
  }
}
