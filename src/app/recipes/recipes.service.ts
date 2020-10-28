import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private _recipes: Recipe[] = [
    new Recipe('r1', 'salmon', 'delicious baked salmon', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/the-health-benefits-of-salmon-700-350-5baa608.jpg?quality=90&resize=768,574'),
    new Recipe('r1', 'steak', 'awesome steak', 'https://www.jessicagavin.com/wp-content/uploads/2018/06/how-to-reverse-sear-a-steak-11-1200.jpg')
  ];

  get recipes() {
    return [...this._recipes];
  }

  constructor() { }
}
