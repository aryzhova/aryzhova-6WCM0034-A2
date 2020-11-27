import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  shoppingListItems: string[] = [];

  constructor(
    private http: HttpClient,
    private firebase: AngularFireDatabase,
    private authService: AuthService
  ) { }

  fetchItems() {
    return this.http
      .get(`https://all-recipes-889f2.firebaseio.com/shopping-list.json?id=${this.authService.userId}`)
      .pipe(
        map(res => {
        for(let key in res){
              this.shoppingListItems = res[key].items;
              console.log(res[key].items);
            }
            return this.shoppingListItems;
      })
      );
  }

  addItem(item: string) { 
  
  this.shoppingListItems.push(item);

   let updatedList = [...this.shoppingListItems];

   this.updateItemsOnServer(updatedList);

  }

  deleteItem(index: number) {
    this.shoppingListItems.splice(index, 1);

    let updatedList = [...this.shoppingListItems];
    
    this.updateItemsOnServer(updatedList);
   
  }

  updateItemsOnServer(updatedList: string[]) {
    let shopping_list = this.firebase.database
    .ref('shopping-list')
    .orderByChild('id')
    .equalTo(this.authService.userId)
    .once( "value" , function(snapshot){
      snapshot.forEach(function(shopping_list){
        shopping_list.ref.update({items: updatedList});
      })
    });
  }
}
