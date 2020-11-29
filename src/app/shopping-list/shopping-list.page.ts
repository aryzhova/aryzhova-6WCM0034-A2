import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
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
    this.shoppingService.fetchItems().subscribe(items => {
      this.shoppingItems = items;
    });
  }

  onDeleteItem(index) {
    this.shoppingService.deleteItem(index);
  }

  onAddItem(item) {
    if(!item) {
      this.invalidInput = true;
      return;
    } else {
      this.invalidInput = false;
      this.shoppingService.addItem(item);
    }
  }
}
