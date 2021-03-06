import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private shoppingListItems: string[] = [];
  items = new Subject<string[]>();

  constructor(
    private http: HttpClient,
    private firebase: AngularFireDatabase,
    private authService: AuthService,
    public toastCtrl: ToastController
  ) { }

  fetchItems(){
    return this.http
      .get(`https://all-recipes-889f2.firebaseio.com/shopping-list/${this.authService.userId}.json`)
      .pipe(
        map(res => {
             //checking if there are already items in the shopping saved on the server 
              if(res['items']) {
                this.shoppingListItems = res['items'];
                this.items.next(res['items']);
              }
             return this.shoppingListItems;
      })
      );
  }

  addItem (item: string){ 
   console.log('length again', this.shoppingListItems.length, item);
   if(this.shoppingListItems.length <= 0) {
     this.fetchItems().subscribe(items => {
      this.shoppingListItems = [...items];

      this.shoppingListItems.push(item);

      let updatedList = [...this.shoppingListItems];
      this.items.next(updatedList);
      this.updateItemsOnServer(updatedList);
      
     });
   } else {
    this.shoppingListItems.push(item);

    let updatedList = [...this.shoppingListItems];
    this.items.next(updatedList);
     this.updateItemsOnServer(updatedList);
   }
   
  }

  deleteItem(index: number) {
    this.shoppingListItems.splice(index, 1);

    let updatedList = [...this.shoppingListItems];
    this.items.next(updatedList);
    
    this.updateItemsOnServer(updatedList);
   
  }

  updateItemsOnServer(updatedList: string[]) {
    console.log('updated list', updatedList);
    let self = this;  //in order to keep reference to this object
    this.firebase.database
    .ref('shopping-list')
    .orderByChild('id')
    .equalTo(this.authService.userId)
    .once( "value" , function(snapshot){
      snapshot.forEach(function(shopping_list){
        shopping_list.ref.update({items: updatedList})
        .then(() => {
          self.toastCtrl.create({
            message: 'Your shopping list has been updated!',
            position: 'middle',
            duration: 1000
          })
          .then(toast => {
            toast.present();
          })
        });
      })
    });
  }
}
