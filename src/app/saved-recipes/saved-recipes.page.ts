import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipesService } from '../recipes/recipes.service';

@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.page.html',
  styleUrls: ['./saved-recipes.page.scss'],
})
export class SavedRecipesPage implements OnInit {
  savedRecipes: Recipe[];

  constructor(
    private recipeService: RecipesService
  ) { }

  ngOnInit() {
    this.recipeService.fetchSavedRecipes().subscribe(savedRecipes => {
       this.savedRecipes = savedRecipes;
    })
  }

}
