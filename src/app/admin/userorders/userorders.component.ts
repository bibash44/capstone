import { MatDialog } from '@angular/material/dialog';
import { UserordersService } from './userorders.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.scss']
})
export class UserordersComponent {

  displayedColumns: string[] = ['id', 'productname', 'username', 'state', 'zip', 'phone', 'price', 'totalitems', 'image', 'status', 'changestatus'];
  dataSource = new MatTableDataSource();

  loggedInUserData: any;
  isUserLoggedIn: any;

  loadCartData = true;

  cartId: any;



  public BASE_URL: string;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;


  constructor(private userordersservice: UserordersService, public dialog: MatDialog, private configservice: ConfigService) {
    this.BASE_URL = this.configservice.BASE_URL();

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.configservice.isUserTryingToAccessAdminPAges();

    this.getLoggedInUserData();
    this.getCartData();
  }


  getCartData() {
    this.userordersservice.getUserOrderedData(this.loggedInUserData.token).subscribe((data: any) => {
      console.log(data)
      if (data.success) {
        this.loadCartData = false;
        this.dataSource.data = data.data;
      }
      else {
        this.loadCartData = false;
      }
    })
  }

  getLoggedInUserData() {
    this.loggedInUserData = JSON.parse(window.localStorage.getItem('LOGGEDIN_USER_DATA'));
    if (this.loggedInUserData) {
      if (this.loggedInUserData.loggedin) {
        this.isUserLoggedIn = true;
      }
    }
  }

  changeOrderStatus(status: any, id: any) {

    let data = {
      status: status,
      id: id
    }

    this.userordersservice.changeOrderStatus(data, this.loggedInUserData.token).subscribe((data: any) => {
      if (data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    })
  }

}
