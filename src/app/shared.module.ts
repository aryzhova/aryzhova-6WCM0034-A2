import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { RecipeCardComponent } from "./recipe-card/recipe-card.component";
import { RouterModule } from "@angular/router";


@NgModule({
    declarations: [RecipeCardComponent],
    exports: [RecipeCardComponent, RouterModule],
    imports: [IonicModule]
})

export class SharedModule{}