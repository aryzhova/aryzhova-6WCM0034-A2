import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
  form: FormGroup;
  ingredients: FormArray;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.ingredients = this.fb.array([
      new FormControl('', Validators.required),
    ])

    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      preptime: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      instructions: new FormControl(null, {
        updateOn:'blur',
        validators: [Validators.required, Validators.maxLength(200)]
      })
    });
  }

  onCreateRecipe() {
    if(!this.form.valid || !this.ingredients.valid) {
      return;
    }
      this.recipeService.addRecipe(
      this.form.value.title,
      this.form.value.preptime,
      this.ingredients.value,
      this.form.value.instructions
    )
    .subscribe(() => {
      this.form.reset;
      this.router.navigate(['recipes/tabs/my-recipes']);
    });
  }

  addControl() {
    this.ingredients.push(new FormControl('', Validators.required));
  }

  removeControl(index) {
    if(index === 0) {
      return;
    }
    this.ingredients.removeAt(index);
  }
}
