import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter, map, switchMap } from 'rxjs';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { LoaderService } from 'src/app/services/loader.service';
import { startWithNumber } from '../../validators/startWithNumber';
import { Dish } from 'src/app/models/dish.model';
@Component({
  selector: 'restaurant-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class RestaurantEditComponent implements OnInit {
  form!: FormGroup;
  restaurant: Restaurant | null = null;

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
      openHoures: '',
      faundationDate: '',
      dishes: [],
    });
  }

  subscription!: Subscription;

  ngOnInit(): void {
    this.loaderService.setIsLoading(false);
    const restaurantId = this.route.snapshot.paramMap.get('id');
    if (restaurantId) {
      this.restaurantService.getById(restaurantId).subscribe((restaurant) => {
        this.restaurant = restaurant;
        this.form.patchValue(this.restaurant);
      });
    }
  }

  onSaveRestaurant() {
    const restaurant = { ...this.restaurant, ...this.form.value } as Restaurant;
    this.restaurantService.update(restaurant).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: (err) => console.log('err:', err),
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
