import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

//creating interface to define what type of resonse we receiving from the server
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = false;
  private _userId = null;

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  set isAuthenticated(isAuth: boolean) {
    this._isAuthenticated = isAuth;
  }

  get userId() {
    return this._userId;
  }

  set userId(uId: string) {
    this._userId = uId;
  }

  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
    {email: email, password: password, returnSecureToken: true});
  }

  logout() {
    this._isAuthenticated = false;
  }

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
                    {email: email, password: password, returnSecureToken: true}
                  );
  }

  createShoppingList(userId: string) {

    this.http.put(`https://all-recipes-889f2.firebaseio.com/shopping-list/${userId}.json`,{id: userId, items: []}).subscribe();
  }
}
