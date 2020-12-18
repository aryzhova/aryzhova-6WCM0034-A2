import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes/recipes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  allRecipes;
  filteredRecipes;
  startAt: string;
  endAt: string;
  lastKeypress: number = 0; //event time stamp in milliseconds

  constructor(
    private recipeService: RecipesService
  ) { }

  ngOnInit() {
    this.recipeService.recipes.subscribe(recipes => {
      this.allRecipes = recipes;
    });
  }

  search($event) {

    let keyword = $event.target.value.toLowerCase();
    console.log(keyword);

    this.filteredRecipes = this.allRecipes.filter(recipe => recipe.title.toLowerCase().includes(keyword, 0));

    // if($event.timeStamp - this.lastKeypress > 1000) {
    //   let q = $event.target.value;
    //   console.log(q);
    //   //this.startAt.next(q);
    //   //this.endAt.next(q + "\uf8ff");
    //   this.recipeService.searchRecipes(q, q + "\uf8ff") 
    //   .valueChanges()
    //   .subscribe(recipes => {
    //     console.log('recipess', recipes);
    //     this.allRecipes = recipes}
    //   );
    // }
    // this.lastKeypress = $event.timeStamp;
  }

}
