import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = true;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  authenticate(email: string, password: string) {
    this.isLoading = true;
      this.loadingCtrl
      .create({keyboardClose: true, message: 'Logging in...'})
      .then(loadingElement => {
        loadingElement.present();
        let authObservable: Observable<AuthResponseData>;
        if(this.isLogin){
          authObservable = this.authService.login(email, password);
        } else {
          authObservable =  this.authService.signup(email,password);
        }
       
         authObservable.subscribe(resData => {
            if(!this.isLogin) {
              this.authService.createShoppingList(resData.localId);
            }

            this.isLoading = false;
            this.authService.userId = resData.localId; 
            this.authService.isAuthenticated = true;
            loadingElement.dismiss();
            this.router.navigateByUrl('/recipes/tabs/browse-all');
          }, errorRes => {
            loadingElement.dismiss();
            console.log(errorRes);
            const code = errorRes.error.error.message;
            let message = `Could not sign you up, please try again`;
            if(code === 'EMAIL_EXISTS'){
              message = " This email address already exists";
            } else if (code === 'EMAIL_NOT_FOUND') {
              message=" Email address could not be found";
            } else if (code === 'INVALID_PASSWORD') {
              message = "Password is not correct";
            }
            this. showAlert(message);
          });
      })
    
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.authenticate(email, password);
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  private showAlert(message: string){ 
    this.alertCtrl
      .create({header: 'Authentication failed', message: message, buttons: ['Okay']})
      .then(alertEl => {
        alertEl.present();
      });
  }

}
