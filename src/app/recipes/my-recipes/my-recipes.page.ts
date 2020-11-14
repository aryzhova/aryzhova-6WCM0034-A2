import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.recipeService.recipes.subscribe(recipes => {
      this.myRecipes = recipes;
    });
  }

  ionViewWillEnter() {
    this.recipeService.fetchRecipes().subscribe();
  }

}
