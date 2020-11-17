import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    private router: Router,
    private navCtrl: NavController,
    private recipeService: RecipesService
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
    //this.router.navigateByUrl('/recipes/tabs/browse-all');
    this.navCtrl.navigateBack('/recipes/tabs/browse-all'); //in order to provide back animation
  }

  addToShoppingList(index: number) {
    const ingredient = this.recipe.ingredients[index];
    console.log(ingredient);
  }

}
