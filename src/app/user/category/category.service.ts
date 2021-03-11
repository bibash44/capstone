import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Injectable()
export class CategoryService {


  constructor(private http: HttpClient, private configservice: ConfigService) {
    this.url = this.configservice.BASE_URL();
  }
  private url: string;


  getItemsBySubCategory(category: any, subCategory: any) {
    return this.http.get(this.url + category + '/' + subCategory);
  }

  getElectronisItemsByCategory(subCategory: any) {
    return this.http.get(this.url + subCategory);
  }
}
