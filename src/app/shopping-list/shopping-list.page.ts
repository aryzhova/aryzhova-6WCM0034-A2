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

  onDeleteItem(index) {
    this.shoppingService.deleteItem(index);
  }

  onAddItem(item) {
    if(!item) {
      this.invalidInput = true;
      return;
    } 
    else {
      let duplicate = this.shoppingItems.find(item => item.toLowerCase() === item.toLowerCase());
      if(duplicate){
        this.toastCtrl.create({
          message: 'Item is already in your list!',
          duration: 2000,
          position: 'middle'
        }).then(toast => {
          toast.present();
        })
      } else {
        this.invalidInput = false;
        this.shoppingService.addItem(item);
      }
      
    }
  }
}
