import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private _recipes: Recipe[] = [
    new Recipe('r1', 'salmon', ['salmon', 'onions', 'tomatoes'], 20, 'delicious baked salmon', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/the-health-benefits-of-salmon-700-350-5baa608.jpg?quality=90&resize=768,574'),
    new Recipe('r2', 'steak', ['salmon', 'onions', 'tomatoes'], 15, 'awesome steak', 'https://www.jessicagavin.com/wp-content/uploads/2018/06/how-to-reverse-sear-a-steak-11-1200.jpg'),
    new Recipe('r3', 'pasta carbonara', ['salmon', 'onions', 'tomatoes'], 30, 'just boil it', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&webp=true&resize=440,400'),
    new Recipe('r4', 'steak2', ['salmon', 'onions', 'tomatoes'], 45, 'awesome steak', 'https://www.jessicagavin.com/wp-content/uploads/2018/06/how-to-reverse-sear-a-steak-11-1200.jpg'),
    new Recipe('r4', 'pasta carbonara2', ['salmon', 'onions', 'tomatoes'], 35, 'just boil it', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&webp=true&resize=440,400')
  ];

  constructor() { }

  get recipes() {
    return [...this._recipes];
  }

  getRecipe(id: string) {
    return this._recipes.filter(recipe => recipe.id === id)[0];
  }

 
}
