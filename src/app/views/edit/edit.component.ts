import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { LoaderService } from 'src/app/services/loader.service';
import { startWithNumber } from '../../validators/startWithNumber';
import { Dish } from 'src/app/models/dish.model';
import { iChef } from 'src/app/models/chef.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'restaurant-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class RestaurantEditComponent implements OnInit {
  form!: FormGroup;
  restaurant: Restaurant | null = null;
  subscription!: Subscription;
  chefs: iChef[] = [];
  selectedDishes: string[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,

    private loaderService: LoaderService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, startWithNumber]],
      stars: '',
      openHoures: this.fb.array([]),
      faundationDate: '',
      dishes: [this.selectedDishes],
      chef: {},
    });
  }
  ngOnInit(): void {
    this.loaderService.setIsLoading(true);
    const restaurantId = this.route.snapshot.paramMap.get('id');
    if (restaurantId) {
      this.restaurantService.getById(restaurantId).subscribe((restaurant) => {
        this.restaurant = restaurant;
        console.log(restaurant);
        this.form.patchValue(this.restaurant);

        this.restaurant?.openHoures?.forEach((hour: string) => {
          console.log('Initializing hour:', hour); // Debug line
          const [openTime, closeTime] = hour.split('-');
          this.openHouresFormArray.push(
            this.fb.group({
              open: [openTime, Validators.required],
              close: [closeTime, Validators.required],
            })
          );
        });

        if (this.restaurant?.dishes) {
          this.selectedDishes = this.restaurant.dishes.map((dish) => dish._id);
          this.form.patchValue({ dishes: this.selectedDishes });
        }

        if (this.restaurant?.chefId) {
          this.form.patchValue({ chef: this.restaurant.chefId });
        }
      });
    }
    this.getchefs();
  }

  get openHouresFormArray(): FormArray {
    return this.form.get('openHoures') as FormArray;
  }
  onDishSelect(dishId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;

    if (isChecked) {
      this.selectedDishes.push(dishId);
    } else {
      const index = this.selectedDishes.indexOf(dishId);
      if (index > -1) {
        this.selectedDishes.splice(index, 1);
      }
    }
    this.form.controls['dishes'].setValue(this.selectedDishes);
  }
  onSaveRestaurant() {
    const formValue = this.form.value;
    formValue.openHoures = formValue.openHoures.map(
      (hour: any) => `${hour.open}-${hour.close}`
    );
    const restaurant = { ...this.restaurant, ...formValue } as Restaurant;
    if (this.restaurant && this.restaurant._id) {
      // Check for ID to determine whether to update or create
      // Update existing restaurant
      this.restaurantService.update(restaurant).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err) => console.log('err:', err),
      });
    } else {
      // Create new restaurant
      this.restaurantService.add(restaurant).subscribe({
        next: () => this.router.navigateByUrl('/'),
        error: (err) => console.log('err:', err),
      });
    }
  }
  getDayName(index: number): string {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return days[index];
  }
  setStars(starValue: number) {
    let starString = '';
    switch (starValue) {
      case 1:
        starString = 'one star';
        break;
      case 2:
        starString = 'two stars';
        break;
      case 3:
        starString = 'three stars';
        break;
      case 4:
        starString = 'four stars';
        break;
      case 5:
        starString = 'five stars';
        break;
      default:
        starString = 'no stars';
    }
    this.form.controls['stars'].setValue(starString);
  }
  getchefs() {
    this.http
      .get(`http://localhost:4000/api/v1/admin/chef`, {
        withCredentials: true,
      })
      .subscribe({
        next: (response: any) => {
          this.chefs = response.data;
        },
        error: (error: any) => {
          console.error('Server error', error.error);
        },
      });
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
