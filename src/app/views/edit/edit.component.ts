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

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private loaderService: LoaderService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, startWithNumber]],
      stars: '',
      openHoures: this.fb.array([]),
      faundationDate: '',
      dishes: [],
      chef: {},
    });
  }
  ngOnInit(): void {
    this.loaderService.setIsLoading(false);
    const restaurantId = this.route.snapshot.paramMap.get('id');
    if (restaurantId) {
      this.restaurantService.getById(restaurantId).subscribe((restaurant) => {
        this.restaurant = restaurant;
        this.form.patchValue(this.restaurant);

        // Initialize the open hours form array
        this.restaurant.openHoures.forEach((hour: string) => {
          const [openTime, closeTime] = hour.split('-');
          this.openHoursFormArray.push(
            this.fb.group({
              open: [openTime, Validators.required],
              close: [closeTime, Validators.required],
            })
          );
        });
        this.form.patchValue({ openHoures: this.restaurant.openHoures });
      });
    }
    this.restaurantService.getChefs().subscribe((chefs) => {
      this.chefs = chefs;
    });
  }
  get openHoursFormArray(): FormArray {
    return this.form.get('openHoures') as FormArray;
  }
  onSaveRestaurant() {
    const formValue = this.form.value;
    formValue.openHoures = formValue.openHoures.map(
      (hour: any) => `${hour.open}-${hour.close}`
    );
    const restaurant = { ...this.restaurant, ...formValue } as Restaurant;
    this.restaurantService.update(restaurant).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.log('err:', err),
    });
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
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
