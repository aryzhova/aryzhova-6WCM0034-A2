import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.page.html',
  styleUrls: ['./recipe-detail.page.scss'],
})
export class RecipeDetailPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  onSaveRecipe() {
    //this.router.navigateByUrl('/recipes/tabs/browse-all');
    this.navCtrl.navigateBack('/recipes/tabs/browse-all'); //in order to provide back animation
  }

}
