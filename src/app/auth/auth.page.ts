import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.authService.login();
    this.router.navigateByUrl('/recipes/tabs/browse-all');
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    if(this.isLogin) {
      this.onLogin();
      //send request to login server
    } else {
      //send request to sign up
    }
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

}
