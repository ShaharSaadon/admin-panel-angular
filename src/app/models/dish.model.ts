export interface Dish {
  _id: string;
  type: 'dish';
  name: string;
  special?: string;
  ingredients: string;
  price?: number;
  restaurantId: string;
  dishType?: string;
}
