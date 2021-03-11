import { CartService } from './cart.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  displayedColumns: string[] = ['id', 'productname', 'price', 'totalitems', 'image', 'remove', 'checkout'];
  dataSource = new MatTableDataSource();

  loggedInUserData: any;
  isUserLoggedIn: any;

  loadCartData = true;

  cartId: any;



  public BASE_URL: string;


  @ViewChild('deleteClothingConfirmDialouge') deleteClothingConfirmDialouge: TemplateRef<any>;
  @ViewChild('confirmLogoutDialouge') confirmLogoutDialouge: TemplateRef<any>;

  constructor(private cartservice: CartService, public dialog: MatDialog, private configservice: ConfigService) {
    this.BASE_URL = this.configservice.BASE_URL();
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  ngOnInit(): void {

    this.getLoggedInUserData();
    this.getCartData();
  }


  getCartData() {
    this.cartservice.getCartdata(this.loggedInUserData.userData.data.id, this.loggedInUserData.token).subscribe((data: any) => {
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


  openDeleteItemFormDiaglouge(deletFormValue) {
    this.cartId = deletFormValue.id;
    this.dialog.open(this.deleteClothingConfirmDialouge);
  }

  deleteItem() {
    this.loadCartData = true;
    this.cartservice.deleteFromCart(this.cartId, this.loggedInUserData.token).subscribe((data: any) => {
      if (data.success) {
        this.loadCartData = false;
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else {
        this.loadCartData = false;
      }
    })
  }

  logoutUser() {
    window.localStorage.removeItem('LOGGEDIN_USER_DATA');
    window.location.href = '/';
  }

  confirmLogout() {
    this.dialog.open(this.confirmLogoutDialouge);
  }

}
