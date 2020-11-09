import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesPage } from './recipes.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: RecipesPage,
    children: [
      {
        path: 'browse-all',
        children: [
          {
            path: '',
            loadChildren: () => import('./browse-all/browse-all.module').then( m => m.BrowseAllPageModule)
          },
          {
            path: ':recipeId',
            loadChildren: () => import('./browse-all/recipe-detail/recipe-detail.module').then( m => m.RecipeDetailPageModule)
          }
        ]
      },
      {
        path: 'my-recipes',
        children: [
          {
            path: '',
            loadChildren: () => import('./my-recipes/my-recipes.module').then(m => m.MyRecipesPageModule)
          },
        ]
      },
      {
        path: '',
        redirectTo: 'recipes/tabs/browse-all',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'recipes/tabs/browse-all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipesPageRoutingModule {}
