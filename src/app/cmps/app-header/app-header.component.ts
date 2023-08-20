import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  user: any = null;
  constructor(private http: HttpClient, private UserService: UserService) {}
  ngOnInit(): void {}
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
