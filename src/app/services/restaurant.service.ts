import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  throwError,
  from,
  tap,
  retry,
  catchError,
} from 'rxjs';
import { Restaurant, RestaurantsFilter } from '../models/restaurant.model';
import { HttpClient } from '@angular/common/http';
const ENTITY = 'restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private _restaurants$ = new BehaviorSubject<Restaurant[]>([]);
  public restaurants$ = this._restaurants$.asObservable();

  constructor(private http: HttpClient) {
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

  public remove(id: string): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:4000/api/v1/${ENTITY}/${id}`
    );
  }
}
