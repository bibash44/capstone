import { ConfigService } from './../../config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ClothingsService {

  private url: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.url = this.configService.BASE_URL();
  }



  // tslint:disable-next-line: typedef
  uploadImage(clothingsImage) {
    return this.http.post(this.url + 'upload/image', clothingsImage);
  }

  addItem(clothingsData, token) {
    return this.http.post(this.url + 'clothings', clothingsData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  updateItem(clothingsData, token) {
    return this.http.put(this.url + 'clothings', clothingsData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  deleteItem(clothindData, token) {
    return this.http.delete(this.url + 'clothings/' + clothindData.id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }

  getallItems(token) {
    return this.http.get(this.url + 'clothings', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'bearer ' + token
      })
    });
  }


}
