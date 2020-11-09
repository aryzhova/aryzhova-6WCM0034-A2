import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Recipe } from '../../recipe.model';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.page.html',
  styleUrls: ['./edit-recipe.page.scss'],
})
export class EditRecipePage implements OnInit {
  form: FormGroup;
  recipe: Recipe;
  ingredients: FormArray;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private navCtrl: NavController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if(!paramMap.has('recipeId')) {
        this.navCtrl.navigateBack('/recipes/tabs/my-recipes');
      }
      this.recipe = this.recipeService.getRecipe(paramMap.get('recipeId'));

      this.ingredients = this.fb.array([]);

      for(let i=0; i<this.recipe.ingredients.length; i++){
        this.ingredients.push(
          new FormControl(this.recipe.ingredients[i], Validators.required)
        );
      }

      this.form = new FormGroup({
        title: new FormControl(this.recipe.title, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        preptime: new FormControl(this.recipe.preptime, {
          updateOn: 'blur',
          validators: [Validators.required]
        }),
        instructions: new FormControl(this.recipe.instructions, {
          updateOn:'blur',
          validators: [Validators.required, Validators.maxLength(200)]
        })
      })
    })
  }

  removeControl(index) {
    this.ingredients.removeAt(index);
  }

  addControl() {
    this.ingredients.push(new FormControl('', Validators.required));
  }

  onSaveRecipe() {
    if(!this.form.valid) {
      return;
    }
    console.log('updating...')

  }
}
