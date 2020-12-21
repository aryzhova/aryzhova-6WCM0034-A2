import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';
import { ToastController } from '@ionic/angular';

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
    private authService: AuthService,
    public toastCtrl: ToastController
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
    if(!this.isSaved) {
      this.recipeService.saveRecipe(
        this.recipe.id,
        this.recipe.title,
        this.recipe.preptime,
        this.recipe.ingredients,
        this.recipe.instructions,
        this.recipe.imageUrl);
        this.isSaved = true;
    } else{
      this.recipeService.unsaveRecipe(this.recipe.id);
      this.isSaved = false;
    }
  }

  addToShoppingList(index: number) {
    const ingredientToAdd = this.recipe.ingredients[index];
    let shoppingListItems;
    this.shoppingService.fetchItems().subscribe(items => {
      shoppingListItems = items;
      let duplicate = shoppingListItems.find(item => item.toLowerCase() === ingredientToAdd.toLowerCase());
      if(duplicate){
        this.toastCtrl.create({
          message: 'This item is already in your shopping list.',
          position: 'middle',
          duration: 2000
        }).
        then(toast => {
          toast.present();
        });
      } else {
        this.shoppingService.addItem(ingredientToAdd);
      }
    })
  }
}
