import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.page.html',
  styleUrls: ['./shopping-list.page.scss'],
})
export class ShoppingListPage implements OnInit {
  invalidInput = false;
  shoppingItems = ['milk', 'bread', 'butter'];
  itemInput: string = ""

  constructor() { }

  ngOnInit() {
  }

  onDeleteItem(index) {
    this.shoppingItems.splice(index, 1);
  }

  onAddItem(item) {
    if(!item) {
      this.invalidInput = true;
      return;
    } else {
      this.invalidInput = false;
      this.shoppingItems.push(item);
     // document.querySelector('#item').innerHTML="";
    }
    
  }

}
