import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
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
  isSaved = false;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private recipeService: RecipesService,
    private shoppingService: ShoppingListService,
    private http: HttpClient,
    private authService: AuthService
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
          this.http.get(`https://all-recipes-889f2.firebaseio.com/saved-recipes/${this.authService.userId}/${this.recipe.id}.json`)
          .subscribe(res => {
            if(res) {
              if(this.recipe.id === res['id']) {
                this.isSaved = true;
              }
            }
          });
        });
    })
  }

  onSaveRecipe() {
    this.recipeService.saveRecipe(
      this.recipe.id,
      this.recipe.title,
      this.recipe.preptime,
      this.recipe.ingredients,
      this.recipe.instructions,
      this.recipe.imageUrl);
      this.isSaved = true;
    //this.navCtrl.navigateBack('/recipes/tabs/browse-all'); //in order to provide back animation
  }

  addToShoppingList(index: number) {
    const ingredient = this.recipe.ingredients[index];
    this.shoppingService.addItem(ingredient);
  }

}
