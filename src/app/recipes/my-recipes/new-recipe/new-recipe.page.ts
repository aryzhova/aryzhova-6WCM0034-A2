import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipesService } from '../../recipes.service';
import { switchMap } from 'rxjs/operators';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';



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
    private router: Router,
    private storage: AngularFireStorage
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
      }),
      image: new FormControl(null)
    });
  }

  async onCreateRecipe() {
    if(!this.form.valid || !this.ingredients.valid) {
      return;
    }
      //name for the image to be uploaded
      var filePath = `${this.form.value.title}-${new Date().getTime()}`;
      //path to the storage
      const fileRef= this.storage.ref(filePath);

      return this.storage.upload(filePath, this.form.get('image').value).snapshotChanges()
      .pipe(
        finalize(() => {      //callback function
        return fileRef.getDownloadURL()
        .subscribe(url => {   //url of the uploaded image
           // this.uploadedImageUrl = url;
             console.log('recipe service upload image function finalize: ', url);  
             this.recipeService.addRecipe(
              this.form.value.title,
              this.form.value.preptime,
              this.ingredients.value,
              this.form.value.instructions,
              url
            ).subscribe(() => {
              this.form.reset;
              this.router.navigate(['recipes/tabs/my-recipes']);
            });
        })
      })
    ).subscribe();
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

  async onImagePicked(imageData){
   let imageFile;
   if (typeof imageData === 'string') {
    try {
      const base64Response = await fetch(imageData);
      const blob = await base64Response.blob();
      imageFile = blob;
    } catch (error) {
      console.log(error);
      return;
    }
  } else {
    imageFile = imageData;
  }
  this.form.patchValue({ image: imageFile });
 }
}
