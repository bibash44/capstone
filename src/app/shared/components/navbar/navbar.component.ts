

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faUser, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NavbarService } from './navbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss', './navbar-mediaquery.scss'],
  providers: []
})
export class NavbarComponent {
  // Font awesome icons
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faBars = faBars;
  faTimes = faTimes;

  totalCartItems: any;


  loggedInUserData: any;
  isUserLoggedIn: any;
  searchedItems = [];
  // ng model for search text
  term: any;
  showSearchData = false;
  showCollapseMenu = false;
  showIcon = true;
  // showMenu = true;
  public innerWidth: any;

  isAdmin = false;

  items = [
    { name: 'archie', image: 'assets/images/img1.jpg' },
    { name: 'jake', image: 'assets/images/img2.jpg' },
    { name: 'richard', image: 'assets/images/img3.jpg' }
  ];

  navLinks = [
    { routerLink: '/mobiles', navLikLabel: 'Mobiles' },
    { routerLink: '/laptops', navLikLabel: 'Laptop' },
    { routerLink: '/watches', navLikLabel: 'Watches' },
    { routerLink: '/men', navLikLabel: 'Men' },
    { routerLink: '/women', navLikLabel: 'Women' },
    { routerLink: '/kids', navLikLabel: 'Kids' },
  ];

  ElectronisMenu = [
    { routerLink: '/mobiles', navLinkLabel: 'Mobiles' },
    { routerLink: '/laptop', navLinkLabel: 'Laptop' },
    { routerLink: '/tablet', navLinkLabel: 'Tablet' },
    { routerLink: '/tv', navLinkLabel: 'Tv' },
  ];

  ClothingsMenu = [
    { routerLink: '/men', navLinkLabel: 'Men' },
    { routerLink: '/women', navLinkLabel: 'Women' },
    { routerLink: '/kids', navLinkLabel: 'Kids' },
  ];


  WatchesMenu = [
    { routerLink: '/men', navLinkLabel: 'Men' },
    { routerLink: '/women', navLinkLabel: 'Women' },
  ];


  ShoesMenu = [
    { routerLink: '/men', navLinkLabel: 'Men' },
    { routerLink: '/women', navLinkLabel: 'Women' },
    { routerLink: '/kids', navLinkLabel: 'Kids' },
  ];

  GroceriesMenu = [
    { routerLink: '/fruits', navLinkLabel: 'Fruits' },
    { routerLink: '/vegetables', navLinkLabel: 'Vegetables' },
  ];






  constructor(private route: ActivatedRoute, private navbarservice: NavbarService) {
  }



  ngOnInit(): void {
    this.loggedInUserData = JSON.parse(window.localStorage.getItem('LOGGEDIN_USER_DATA'));
    if (this.loggedInUserData) {
      if (this.loggedInUserData.loggedin) {
        this.isUserLoggedIn = true;
        this.getCartData();
        if (this.loggedInUserData.userData.data.usertype === 'admin') {
          this.isAdmin = true;
        }
      }
    }

  }

  openMenu() {

    this.showCollapseMenu = !this.showCollapseMenu;
    this.showIcon = !this.showIcon;

  }

  closeMenu() {

    this.showCollapseMenu = !this.showCollapseMenu;
    this.showIcon = !this.showIcon;
  }



  getCartData() {
    this.navbarservice.getCartdata(this.loggedInUserData.userData.data.id, this.loggedInUserData.token).subscribe((data: any) => {

      if (data.success) {
        this.totalCartItems = data.data.length;

      }
    })
  }

  logoutUser() {
    window.localStorage.removeItem('LOGGEDIN_USER_DATA');
    window.location.href = '/';
  }
}


  // $('.secondToolbar').css('display', 'none');






