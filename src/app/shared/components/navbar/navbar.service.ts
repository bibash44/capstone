import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {

  constructor(private http: HttpClient) { }

  url = 'http://localhost:2020/';

  getCartdata(userid: any, token: any) {
    return this.http.get(this.url + 'cart/' + userid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }
}
