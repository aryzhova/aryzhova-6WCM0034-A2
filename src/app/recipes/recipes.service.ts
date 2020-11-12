import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Recipe } from './recipe.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private _recipes: Recipe[] = [
    new Recipe('r1', 'salmon', ['salmon', 'onions', 'tomatoes'], 20, 'delicious baked salmon', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/the-health-benefits-of-salmon-700-350-5baa608.jpg?quality=90&resize=768,574', 'u1'),
    new Recipe('r2', 'steak', ['salmon', 'onions', 'tomatoes'], 15, 'awesome steak', 'https://www.jessicagavin.com/wp-content/uploads/2018/06/how-to-reverse-sear-a-steak-11-1200.jpg', 'u1'),
    new Recipe('r3', 'pasta carbonara', ['salmon', 'onions', 'tomatoes'], 30, 'just boil it', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&webp=true&resize=440,400', 'u1'),
    new Recipe('r4', 'steak2', ['salmon', 'onions', 'tomatoes'], 45, 'awesome steak', 'https://www.jessicagavin.com/wp-content/uploads/2018/06/how-to-reverse-sear-a-steak-11-1200.jpg', 'u1'),
    new Recipe('r5', 'pasta carbonara2', ['salmon', 'onions', 'tomatoes'], 35, 'just boil it', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1001491_11-2e0fa5c.jpg?quality=90&webp=true&resize=440,400', 'u1')
  ];

  constructor(
    private http:|HttpClient,
    private authService: AuthService
  ) { }

  get recipes() {
    return [...this._recipes];
  }

  getRecipe(id: string) {
    return this._recipes.filter(recipe => recipe.id === id)[0];
  }

  addRecipe(
    title: string, 
    preptime: number,
    ingredients: string[],
    instructions: string
  ){
    const newRecipe = new Recipe(
      null,
      title,
      ingredients,
      preptime,
      instructions,
      'https://cdn.loveandlemons.com/wp-content/uploads/2019/07/salad.jpg',
      this.authService.userId
    );
    //using observable
    return this.http
    .post('https://all-recipes-889f2.firebaseio.com/recipes.json', { ...newRecipe})
    .pipe(
      tap(resData => {
      console.log(resData);
      })
    );
  }

 
}
