import { iChef } from './chef.model';
import { Dish } from './dish.model';
import { ObjectId } from 'mongodb';

export interface Restaurant {
  _id: string;
  type: 'restaurant';
  name: string;
  chefId: ObjectId;
  stars: number;
  openHoures: string[];
  dishes?: Dish[];
  foundationDate: Date;
}

export interface RestaurantsFilter {
  term: string;
}
