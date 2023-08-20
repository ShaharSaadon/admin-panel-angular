import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

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
  constructor(
    private http: HttpClient,
    private restaurantService: RestaurantService
  ) {
    this.getAllData();
  }
  getAllData() {
    this.entityData = [];
    this.http
      .get('http://localhost:4000/api/v1/admin/', {
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          console.log('Server Response: ', response.data);
          this.data = response.data;
          this.tableData[0].count = this.data[0].length;
          this.tableData[1].count = this.data[1].length;
          this.tableData[2].count = this.data[2].length;
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
  summaryColumns: string[] = ['name', 'count'];

  deleteItem(item: any) {
    this.restaurantService.remove(item._id);
  }
  tableData = [
    { name: 'chef', count: 0 },
    { name: 'dish', count: 0 },
    { name: 'restaurant', count: 0 },
  ];
}
