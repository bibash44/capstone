import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { ConfigService } from 'src/app/config.service';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, private configservice: ConfigService) {
    this.url = this.configservice.BASE_URL();
  }
  private url: string;


  submitLogin(userData: any) {
    return this.http.post<any>(this.url + 'user/login', userData);

  }

}
