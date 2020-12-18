import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})

export class RecipeCardComponent implements OnInit {
  @Input('recipe') recipe: Recipe;

  constructor(
  ) { }

  ngOnInit() {}

}






