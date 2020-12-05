import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.page.html',
  styleUrls: ['./my-recipes.page.scss'],
})
export class MyRecipesPage implements OnInit {
  myRecipes: Recipe[];
  isLoading = false;


  constructor(
    private recipeService: RecipesService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.recipeService.recipes.subscribe(recipes => {
      this.myRecipes = recipes.filter(recipe => recipe.userId === this.authService.userId);
    });
  }

  ionViewWillEnter() {
    this.recipeService.fetchRecipes().subscribe();
  }

}
