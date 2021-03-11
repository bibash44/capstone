import { OrdersService } from './orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {


  loggedInUserData: any;
  isUserLoggedIn: any;

  displayedColumns: string[] = ['id', 'productname', 'price', 'totalitems', 'image', 'status'];
  dataSource = new MatTableDataSource();

  public BASE_URL: string;


  @ViewChild('confirmLogoutDialouge') confirmLogoutDialouge: TemplateRef<any>;

  constructor(private dialog: MatDialog, private ordersService: OrdersService, private configService: ConfigService) {
    this.BASE_URL = this.configService.BASE_URL();

  }

  ngOnInit(): void {
    this.getLoggedInUserData();
    this.getOrderedData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  getLoggedInUserData() {
    this.loggedInUserData = JSON.parse(window.localStorage.getItem('LOGGEDIN_USER_DATA'));
    if (this.loggedInUserData) {
      if (this.loggedInUserData.loggedin) {
        this.isUserLoggedIn = true;
      }
    }
  }


  logoutUser() {
    window.localStorage.removeItem('LOGGEDIN_USER_DATA');
    window.location.href = '/';
  }

  confirmLogout() {
    this.dialog.open(this.confirmLogoutDialouge);
  }

  getOrderedData() {
    this.ordersService.getUserOrderedData(this.loggedInUserData.userData.data.id, this.loggedInUserData.token).subscribe((data: any) => {
      if (data.success) {
        this.dataSource.data = data.data;
      }
    })
  }


}
