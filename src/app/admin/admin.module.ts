

import { UserordersService } from './userorders/userorders.service';
import { TvService } from './tv/tv.service';
import { MobilesService } from './mobiles/mobiles.service';
import { WatchesService } from './watches/watches.service';
import { ShoesService } from './shoes/shoes.service';
import { GroceriesService } from './groceries/groceries.service';
import { ClothingsService } from './clothings/clothings.service';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SharedModule } from './../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MobilesComponent } from './mobiles/mobiles.component';
import { LaptopComponent } from './laptop/laptop.component';
import { TabletComponent } from './tablet/tablet.component';
import { TvComponent } from './tv/tv.component';
import { ClothingsComponent } from './clothings/clothings.component';
import { WatchesComponent } from './watches/watches.component';
import { ShoesComponent } from './shoes/shoes.component';
import { GroceriesComponent } from './groceries/groceries.component';
import { UserindexpageComponent } from './userindexpage/userindexpage.component';
import { UserordersComponent } from './userorders/userorders.component';
import { TabletService } from './tablet/tablet.service';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'clothings',
    component: ClothingsComponent,
  },
  {
    path: 'shoes',
    component: ShoesComponent,
  },
  {
    path: 'watches',
    component: WatchesComponent,
  },
  {
    path: 'groceries',
    component: GroceriesComponent,
  },
  {
    path: 'userindexpage',
    component: UserindexpageComponent,
  },

  {
    path: 'userorders',
    component: UserordersComponent,
  },

  {
    path: 'electronics',
    children: [
      {
        path: 'mobiles',
        component: MobilesComponent,
      },
      {
        path: 'laptop',
        component: LaptopComponent,
      },
      {
        path: 'tablet',
        component: TabletComponent,
      },
      {
        path: 'tv',
        component: TvComponent,
      },
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent,
    MobilesComponent,
    LaptopComponent,
    TabletComponent,
    TvComponent,
    ClothingsComponent,
    WatchesComponent,
    ShoesComponent,
    GroceriesComponent,
    UserindexpageComponent,
    UserordersComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    CommonModule,
    CarouselModule,
    FormsModule,
  ],
  providers: [
    ClothingsService,
    GroceriesService,
    ShoesService,
    WatchesService,
    MobilesService,
    TvService,
    UserordersService,
    TabletService,
  ]
})
export class AdminModule { }
