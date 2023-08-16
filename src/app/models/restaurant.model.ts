import { Dish } from './dish.model';
export interface Restaurant {
  _id: string;
  type: 'restaurant';
  name: string;
  chef?: string;
  stars: number;
  openHoures: string[];
  dishes?: Dish[];
  faundationDate: Date;
}

export interface RestaurantsFilter {
  term: string;
}
