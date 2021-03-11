import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent {

  hide = true;
  checked: any;

  responseStatus: boolean;
  responseText: string;
  loading: any;

  loggedInUserData: any;
  isUserLoggedIn = false;


  public LoginFormGroup: FormGroup;

  constructor(private loginFormBuilder: FormBuilder, private loginService: LoginService, private _snackBar: MatSnackBar, private _router: Router) {
    this.LoginFormGroup = this.loginFormBuilder.group({
      email: ['', [
        Validators.required,
      ]],
      password: ['', [
        Validators.required
      ]],
    })

  }





  submitLogin() {
    this.loading = true;
    this.loginService.submitLogin(this.LoginFormGroup.value).subscribe((userdata: any) => {
      if (userdata.success) {
        this.loading = false;


        const userSessionData = {
          loggedin: true,
          token: userdata.token,
          userData: userdata
        };

        localStorage.setItem('LOGGEDIN_USER_DATA', JSON.stringify(userSessionData));



        this._snackBar.open(' Welcome', userdata.data.fname + ' ' + userdata.data.lname, {
          duration: 5000
        });

        if (userdata.data.usertype === 'user') {
          setTimeout(() => {
            window.location.href = '/profile';
          }, 1500);
        }

        else if (userdata.data.usertype === 'admin') {
          setTimeout(() => {
            window.location.href = '/admin';
          }, 1500);
        }


      }
      else {
        this.loading = false;
        this.responseText = userdata.message;
        this.responseStatus = true;
        this.loading = false;

      }
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.responseStatus = true;
      this.responseText = error.statusText;
    });
  }

  ngOnInit(): void {
    this.getLoggedInUserData();
  }

  getLoggedInUserData() {
    this.loggedInUserData = JSON.parse(window.localStorage.getItem('LOGGEDIN_USER_DATA'));
    if (this.loggedInUserData) {
      if (this.loggedInUserData.loggedin) {
        this.isUserLoggedIn = true;
        if (this.loggedInUserData.userData.data.usertype === 'user') {
          this._router.navigate(['/profile']);
        }

        else if (this.loggedInUserData.userData.data.usertype === 'admin') {
          this._router.navigate(['/admin']);
        }
      }
    }
  }
}
