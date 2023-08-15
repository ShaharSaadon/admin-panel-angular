import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service/user-service.service'; // <-- Change here
@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  data: any[] = [];
  user: any = null;
  @Output() loggedInUser = new EventEmitter();

  constructor(private http: HttpClient, private userService: UserService) {}
  ngOnInit() {
    this.http
      .get('http://localhost:4000/api/v1/admin/', {
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          console.log('Server response:', response.data);
          console.log('User details:', response.user);
          this.data = response.data;
          this.user = response.user;
          this.userService.setUser(response.user);
        },
        (error: any) => {
          console.error('Server error:', error.error);
          // Handle errors here
        }
      );
  }
}
