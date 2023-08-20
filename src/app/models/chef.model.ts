import { Restaurant } from './restaurant.model';

export interface iChef {
  _id: string;
  name: string;
  description: string;
  restaurants: Restaurant[];
}
