import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../cmps/confirm-dialog/confirm-dialog.component';
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
  entityType: string = '';
  @Output() loggedInUser = new EventEmitter();
  ngOnInit() {}
  constructor(
    private http: HttpClient,
    private restaurantService: RestaurantService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.getAllData();
  }
  getAllData() {
    this.entityData = [];
    this.entityType = '';
    this.http
      .get('http://localhost:4000/api/v1/admin/', {
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          this.data = response.data;
          this.tableData[0].count = this.data[0].length;
          this.tableData[1].count = this.data[1].length;
          this.tableData[2].count = this.data[2].length;
        },
        error: (error: any) => {
          console.error('Server error', error.error);
          if (error.status === 404) {
            this.router.navigate(['/']);
          }
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
          this.entityType = entity;
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.restaurantService.remove(item._id);
      }
    });
  }

  onSelectionChange(event: any) {
    const selectedValue = event.value;
    if (selectedValue === 'all') {
      this.getAllData();
    } else {
      this.handleData(selectedValue);
    }
  }
  tableData = [
    { name: 'chef', count: 0 },
    { name: 'dish', count: 0 },
    { name: 'restaurant', count: 0 },
  ];
}
