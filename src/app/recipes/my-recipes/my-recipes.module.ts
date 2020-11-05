import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyRecipesPageRoutingModule } from './my-recipes-routing.module';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

import { MyRecipesPage } from './my-recipes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyRecipesPageRoutingModule
  ],
  declarations: [MyRecipesPage, RecipeItemComponent]
})
export class MyRecipesPageModule {}
