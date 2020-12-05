import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavedRecipesPageRoutingModule } from './saved-recipes-routing.module';

import { SavedRecipesPage } from './saved-recipes.page';
import { RecipeItemComponent } from '../recipes/my-recipes/recipe-item/recipe-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavedRecipesPageRoutingModule
  ],
  declarations: [SavedRecipesPage, RecipeItemComponent]
})
export class SavedRecipesPageModule {}
