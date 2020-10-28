import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-browse-all',
  templateUrl: './browse-all.page.html',
  styleUrls: ['./browse-all.page.scss'],
})
export class BrowseAllPage implements OnInit {
  fetchedRecipes: Recipe[];

  constructor(
    private recipeService: RecipesService
  ) { }

  ngOnInit() {
    this.fetchedRecipes = this.recipeService.recipes;
  }

}
