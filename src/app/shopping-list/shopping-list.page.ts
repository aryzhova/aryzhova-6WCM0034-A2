import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  invalidInput = false;
  shoppingItems = [];
  itemInput: string = ""

  constructor(
    private shoppingService: ShoppingListService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.shoppingService.items.subscribe(items => {
      this.shoppingItems = items;
    });
 
    this.shoppingService.fetchItems().subscribe();
    console.log('onInit');
  }

  ionViewWillEnter(){
    console.log('will enter');
    
  }
  
  ionViewHasEntered () {
    console.log('has entered');
  }

  onDeleteItem(index) {
    this.shoppingService.deleteItem(index);
  }

  onAddItem(item) {
    if(!item) {
      this.invalidInput = true;
      return;
    } 
    else {
      console.log('shopping list items length: ', this.shoppingItems.length);
      this.invalidInput = false;
      this.shoppingService.addItem(item);
    }
  }
}
