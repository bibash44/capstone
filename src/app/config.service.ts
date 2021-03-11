import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private _router: Router) { }


  private BACKEND_URL = 'https://ashimupd.xyz/';



  loggedInUserData: any;

  public BASE_URL(): string {

    return this.BACKEND_URL;
  }

  isUserTryingToAccessAdminPAges() {

    this.loggedInUserData = JSON.parse(window.localStorage.getItem('LOGGEDIN_USER_DATA'));
    if (this.loggedInUserData) {
      if (this.loggedInUserData.loggedin && this.loggedInUserData.userData.data.usertype === 'user') {
        this._router.navigate(['/profile']);
      }

      else if (this.loggedInUserData.loggedin && this.loggedInUserData.userData.data.usertype === 'admin') {
        // this._router.navigate([adminRoute]);
        // do nothins
      }
    }
  }


}
