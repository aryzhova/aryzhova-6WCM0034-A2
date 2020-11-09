import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.page.html',
  styleUrls: ['./new-recipe.page.scss'],
})
export class NewRecipePage implements OnInit {
  form: FormGroup;
  ingredients: FormArray;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.ingredients = this.fb.array([
      new FormControl('', Validators.required),
      new FormControl('', Validators.required),
      new FormControl('', Validators.required)
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
    if(!this.form.valid) {
      return;
    }
    console.log('creating...')
  }

  addControl() {
    this.ingredients.push(new FormControl('', Validators.required));
  }

  removeControl(index) {
    this.ingredients.removeAt(index);
  }
}
