import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Recipe } from './recipe.model';
import { take, map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of} from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  //managing local state
  private _recipes = new BehaviorSubject<Recipe[]>([]);
  
  //urlObservable: Observable<string>;
  //uploadedImageUrl: any;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private db: AngularFireDatabase
  ) { }

  get recipes() {
    return this._recipes.asObservable();
  }
  
  //fetching recipes from the server
  //using map operator in order to modify recieved data into the right format
  fetchRecipes() {
    return this.http
      .get('https://all-recipes-889f2.firebaseio.com/recipes.json')
      .pipe(
      map(resData => {
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
    return this.http
      .get<Recipe>(`https://all-recipes-889f2.firebaseio.com/recipes/${id}.json`)
      .pipe(
        map(recipe => {
          return new Recipe(
            id,
            recipe.title,
            recipe.ingredients,
            recipe.preptime,
            recipe.instructions,
            recipe.imageUrl,
            recipe.userId
          );
        })
      );
  }

  addRecipe(
    title: string, 
    preptime: number,
    ingredients: string[],
    instructions: string,
    imageUrl: string
  ){
    let newRecipeId: string;
    const newRecipe = new Recipe(
      null,
      title,
      ingredients,
      preptime,
      instructions,
      imageUrl,
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

  updateRecipe(
    recipeId: string,
    title: string,
    preptime: number,
    ingredients: string[],
    instructions: string,
    imageUrl: string
    ) {
      let updatedRecipes: Recipe[];
      return this.recipes.pipe(
        take(1),
        switchMap(recipes => {
          if(!recipes || recipes.length <= 0) { //checking if there are any recipes saved locally. if not fetching them from the server
            return this.fetchRecipes();  
          } else {
            return of(recipes);
          }
        }),
        switchMap(recipes => {
          const updatedRecipeIndex = recipes.findIndex(recipe => recipe.id === recipeId);
          updatedRecipes = [ ...recipes]; //updating local state
          const oldRecipe = updatedRecipes[updatedRecipeIndex];
          updatedRecipes[updatedRecipeIndex] = new Recipe(
            oldRecipe.id,
            title,
            ingredients,
            preptime,
            instructions,
            imageUrl,
            oldRecipe.userId
          );
          return this.http
            .put(`https://all-recipes-889f2.firebaseio.com/recipes/${recipeId}.json`,
            { ...updatedRecipes[updatedRecipeIndex], id: null});
          }
        ),
        tap(() => {
          this._recipes.next(updatedRecipes);
        }))
        
  }

  saveRecipe(
    id: string,
    title: string, 
    preptime: number,
    ingredients: string[],
    instructions: string,
    imageUrl: string
  ) {
    const savedRecipe = new Recipe(
      id,
      title,
      ingredients,
      preptime,
      instructions,
      imageUrl,
      this.authService.userId
    );
    return this.http.put(`https://all-recipes-889f2.firebaseio.com/saved-recipes/${this.authService.userId}/${id}.json`,{...savedRecipe}).subscribe();
  }

  unsaveRecipe(id: string) {
    this.http.delete(`https://all-recipes-889f2.firebaseio.com/saved-recipes/${this.authService.userId}/${id}.json`).subscribe();
  }

  fetchSavedRecipes() {
    return this.http
    .get(`https://all-recipes-889f2.firebaseio.com/saved-recipes/${this.authService.userId}.json`)
    .pipe(
       map(resData => {
        const savedRecipes = [];
        for(const key in resData) {
          if(resData.hasOwnProperty(key)){
            savedRecipes.push(new Recipe(
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
      return savedRecipes;
      })
      // tap(recipes => {
      //   this._recipes.next(recipes);
      // })
    );
  }

  
}

