import { CheckoutService } from './checkout/checkout.service';
import { CheckoutallService } from './checkoutall/checkoutall.service';
import { CartService } from './cart/cart.service';
import { SingleprodductService } from './singleprodduct/singleprodduct.service';
import { CategoryService } from './category/category.service';
import { SignupService } from './signup/signup.service';

import { LoginService } from './login/login.service';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { FormsModule } from '@angular/forms';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { OrdersComponent } from './orders/orders.component';
import { CategoryComponent } from './category/category.component';
import { SingleprodductComponent } from './singleprodduct/singleprodduct.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutallComponent } from './checkoutall/checkoutall.component';
import { IndexService } from './index/index.service';
import { ProfileService } from './profile/profile.service';
import { OrdersService } from './orders/orders.service';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'profile',
    component: ProfileComponent,

  },

  {
    path: 'cart',
    component: CartComponent,

  },

  {
    path: 'orders',
    component: OrdersComponent,

  },

  {
    path: 'categories/:category/:subcategory',
    component: CategoryComponent,


  },
  {
    path: 'categories/:category/:subcategory/:pid',
    component: SingleprodductComponent,

  },

  {
    path: 'checkout/:cartid',
    component: CheckoutComponent,

  },
  {
    path: 'checkoutall',
    component: CheckoutallComponent,

  }

];


@NgModule({
  declarations: [
    IndexComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    CartComponent,
    OrdersComponent,
    CategoryComponent,
    SingleprodductComponent,
    CheckoutComponent,
    CheckoutallComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule,
    CarouselModule,
    FormsModule,
    ShareIconsModule,

  ],
  providers: [
    LoginService,
    SignupService,
    CategoryService,
    SingleprodductService,
    CartService, CheckoutService,
    CheckoutallService,
    IndexService,
    ProfileService,
    OrdersService,
  ]
})
export class UserModule { }
