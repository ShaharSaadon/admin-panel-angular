import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { iChef } from '../models/chef.model';
const ENTITY = 'restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private _restaurants$ = new BehaviorSubject<Restaurant[]>([]);
  public restaurants$ = this._restaurants$.asObservable();
  constructor(private http: HttpClient, private router: Router) {
    this.loadRestaurants();
  }

  private loadRestaurants() {
    this.http
      .get<Restaurant[]>(`http://localhost:4000/api/v1/admin/${ENTITY}`)
      .subscribe({
        next: (restaurants) => {
          this._restaurants$.next(restaurants);
        },
        error: (error) => {
          console.error('Server error', error.error);
          if (error.status === 401) {
            this.router.navigate(['/login']);
          }
        },
      });
  }

  public getById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(
      `http://localhost:4000/api/v1/${ENTITY}/${id}`
    );
  }

  public add(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(
      `http://localhost:4000/api/v1/${ENTITY}`,
      restaurant
    );
  }

  public update(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.put<Restaurant>(
      `http://localhost:4000/api/v1/${ENTITY}/${restaurant._id}`,
      restaurant
    );
  }

  public getChefs(): Observable<iChef[]> {
    return this.http.get<iChef[]>('http://localhost:4000/api/v1/admin/chef');
  }
  remove(_id: string) {
    return this.http
      .delete(`http://localhost:4000/api/v1/${ENTITY}/${_id}`, {
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          console.log('Item deleted successfully', response);
          this.loadRestaurants();
        },
        error: (error) => {
          console.error('Error deleting item:', error);
        },
      });
  }
}
