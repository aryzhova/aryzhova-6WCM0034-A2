import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService,
    private shoppingService: ShoppingListService
  ) { }

  ngOnInit() {
    this.shoppingService.fetchItems().subscribe(items => {
      this.shoppingItems = items;
    });
    
    // this.shoppingService.shoppingListItems.subscribe(items => {
    //   this.shoppingItems = items;
    // })
  }

  onDeleteItem(index) {
    this.shoppingService.deleteItem(index);
    //this.shoppingItems.splice(index, 1);
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
