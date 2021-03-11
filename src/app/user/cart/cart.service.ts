import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Injectable()
export class CartService {


  constructor(private http: HttpClient, private configservice: ConfigService) {
    this.url = this.configservice.BASE_URL();
  }
  private url: string;


  getCartdata(userid: any, token: any) {
    return this.http.get(this.url + 'cart/' + userid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  deleteFromCart(cartid: any, token: any) {
    return this.http.delete(this.url + 'cart/' + cartid, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

}
