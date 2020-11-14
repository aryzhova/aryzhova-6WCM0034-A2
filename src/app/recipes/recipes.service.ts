import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Recipe } from './recipe.model';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  //managing local state
  private _recipes = new BehaviorSubject<Recipe[]>([]);

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  get recipes() {
    return this._recipes.asObservable();
  }

  //fetching recipes from the server
  //using map operator in order to modify recieved data into the right format
  fetchRecipes() {
    return this.http
      .get('https://all-recipes-889f2.firebaseio.com/recipes.json')
      .pipe(map(resData => {
        const recipes = [];
        for(const key in resData) {
          if(resData.hasOwnProperty(key)){
            recipes.push(new Recipe(
              key,
              resData[key].title,
              resData[key].ingredients,
              resData[key].preptime,
              resData[key].instructions,
              resData[key].imageUrl,
              resData[key].userId
            ))
          }
        }
        return recipes;
      }),
      tap(recipes => {
        this._recipes.next(recipes);
      })
      );
  }

  getRecipe(id: string) {
    //return this._recipes.filter(recipe => recipe.id === id)[0];
    return null;
  }

  addRecipe(
    title: string, 
    preptime: number,
    ingredients: string[],
    instructions: string
  ){
    let newRecipeId: string;
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
    .post<{ name: string }>('https://all-recipes-889f2.firebaseio.com/recipes.json', { ...newRecipe})
    .pipe(
      switchMap(resData => {
        newRecipeId = resData.name;
        return this.recipes;
      }),
      take(1),
      tap(recipes => {
        newRecipe.id = newRecipeId;
        this._recipes.next(recipes.concat(newRecipe));
      })  
    );
  }

 
}
