import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Injectable()
export class SingleprodductService {

  constructor(private http: HttpClient, private configservice: ConfigService) {
    this.url = this.configservice.BASE_URL();
  }
  private url: string;




  getItemsBySubCategory(category: any, id: any) {
    return this.http.get(this.url + category + '/id/' + id);
  }

  getElectronisItemsByCategory(subCategory: any, id: any) {
    return this.http.get(this.url + subCategory + '/id/' + id);
  }

  postComment(commentData: any, token: any) {
    return this.http.post(this.url + 'comment', commentData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  getComments(producttype: any, productid: any) {
    return this.http.get(this.url + 'comment/' + producttype + '/' + productid);
  }


  addToCart(cartData: any, token: any) {
    return this.http.post(this.url + 'cart', cartData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }
}
