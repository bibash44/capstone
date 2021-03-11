import { ConfigService } from './../../config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GroceriesService {

  constructor(private http: HttpClient, private configservice: ConfigService) {
    this.url = this.configservice.BASE_URL();
  }
  private url: string;

  // tslint:disable-next-line: typedef
  uploadImage(groceriesImage) {
    return this.http.post(this.url + 'upload/image', groceriesImage);
  }

  addItem(groceriesData, token) {
    return this.http.post(this.url + 'groceries', groceriesData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  updateItem(groceriesData, token) {
    return this.http.put(this.url + 'groceries', groceriesData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  deleteItem(clothindData, token) {
    return this.http.delete(this.url + 'groceries/' + clothindData.id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  getallItems(token) {
    return this.http.get(this.url + 'groceries', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }
}
