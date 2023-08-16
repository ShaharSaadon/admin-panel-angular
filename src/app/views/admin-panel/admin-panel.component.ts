import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
  data: any[] = [];
  user: any = null;
  entityData: any[] = [];
  @Output() loggedInUser = new EventEmitter();
  ngOnInit() {}
  constructor(private http: HttpClient, private userService: UserService) {}
  getAllData() {
    this.http
      .get('http://localhost:4000/api/v1/admin/', {
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          console.log('Server Response: ', response.data);
          this.data = response.data;
        },
        error: (error: any) => {
          console.error('Server error', error.error);
        },
      });
  }
  handleData(entity: string) {
    this.http
      .get(`http://localhost:4000/api/v1/admin/${entity}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          console.log('Server Response: ', response.data);
          this.entityData = response.data;
        },
        error: (error: any) => {
          console.error('Server error', error.error);
        },
      });
  }
  displayedColumns: string[] = ['_id', 'name', 'edit', 'delete'];
  editItem(item: any) {}
  deleteItem(item: any) {
    console.log('deleteitem=', item);
  }
}
