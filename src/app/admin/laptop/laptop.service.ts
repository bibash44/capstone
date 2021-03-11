import { ConfigService } from './../../config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  constructor(private http: HttpClient, private configservice: ConfigService) {
    this.url = this.configservice.BASE_URL();
  }
  private url: string;

  // tslint:disable-next-line: typedef
  uploadImage(laptopImage) {
    return this.http.post(this.url + 'upload/image', laptopImage);
  }

  addItem(laptopData, token) {
    return this.http.post(this.url + 'laptop', laptopData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  updateItem(laptopData, token) {
    return this.http.put(this.url + 'laptop', laptopData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  deleteItem(clothindData, token) {
    return this.http.delete(this.url + 'laptop/' + clothindData.id,  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  getallItems(token) {
    return this.http.get(this.url + 'laptop', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }
}
