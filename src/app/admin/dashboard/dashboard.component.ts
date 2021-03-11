import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfigService } from 'src/app/config.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private browseIcons = 'assets/icons/';

  Electronics = [
    { name: 'Mobiles', faIcon: 'fa-mobile', routerLink: 'mobiles', fontColor: '#F44336' },
    { name: 'Laptop', faIcon: 'fa-laptop', routerLink: 'laptop', fontColor: '#22A7F2' },
    { name: 'Tablet', faIcon: 'fa-tablet', routerLink: 'tablet', fontColor: '#F2A722' },
    { name: 'Tv', faIcon: 'fa-tv', routerLink: 'tv', fontColor: '#1E8139' },
  ];

  Others = [
    { name: 'Clothings', svgIcon: 'clothings', routerLink: 'clothings', },
    { name: 'Watches', svgIcon: 'watches', routerLink: 'watches', },
    { name: 'Shoes', svgIcon: 'shoes', routerLink: 'shoes', },
    { name: 'Groceries', svgIcon: 'groceries', routerLink: 'groceries', },
  ];


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private http: HttpClient, private configservice: ConfigService) {
    iconRegistry.addSvgIcon('electronics', sanitizer.bypassSecurityTrustResourceUrl(this.browseIcons + 'electronics.svg'));
    iconRegistry.addSvgIcon('clothings', sanitizer.bypassSecurityTrustResourceUrl(this.browseIcons + 'clothings.svg'));
    iconRegistry.addSvgIcon('watches', sanitizer.bypassSecurityTrustResourceUrl(this.browseIcons + 'watches.svg'));
    iconRegistry.addSvgIcon('shoes', sanitizer.bypassSecurityTrustResourceUrl(this.browseIcons + 'shoes.svg'));
    iconRegistry.addSvgIcon('groceries', sanitizer.bypassSecurityTrustResourceUrl(this.browseIcons + 'groceries.svg'));
    iconRegistry.addSvgIcon('indexpage', sanitizer.bypassSecurityTrustResourceUrl(this.browseIcons + 'indexpage.svg'));
    iconRegistry.addSvgIcon('userorders', sanitizer.bypassSecurityTrustResourceUrl(this.browseIcons + 'userorders.svg'));

  }

  ngOnInit(): void {
    this.configservice.isUserTryingToAccessAdminPAges();
  }
}
