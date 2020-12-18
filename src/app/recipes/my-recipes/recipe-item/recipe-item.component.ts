import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item-editable',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss'],
})
export class RecipeItemComponent implements OnInit {
  @Input('recipe') recipe: Recipe;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  onEditRecipe(recipeId: string) {
    this.router.navigateByUrl('/recipes/tabs/my-recipes/edit-recipe/' + recipeId);
    console.log('recipe-item component: ' + recipeId);
  }

}
