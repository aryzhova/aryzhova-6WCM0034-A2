import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {
  recipe: Recipe;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private recipeService: RecipesService,
    private alrtCtrl: AlertController,
    private shoppingService: ShoppingListService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('recipeId')) {
        this.navCtrl.navigateBack('/recipes/tabs/browse-all');
        return;
      }
      this.isLoading = true;
      this.recipeService.getRecipe(paramMap.get('recipeId'))
        .subscribe(recipe => {
          this.recipe = recipe;
          this.isLoading = false;
        });
    })
  }

  onSaveRecipe() {
    this.navCtrl.navigateBack('/recipes/tabs/browse-all'); //in order to provide back animation
  }

  addToShoppingList(index: number) {
    const ingredient = this.recipe.ingredients[index];
    this.shoppingService.addItem(ingredient);
  }

}
