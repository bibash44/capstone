import { IndexService } from './index.service';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ConfigService } from 'src/app/config.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {

  constructor(private indexService: IndexService, private configservice: ConfigService) {
    this.BASE_URL = this.configservice.BASE_URL();

  }

  Loading1 = true;
  Loading2 = true;
  Loading3 = true;

  loadMoreBestSales = 4;

  public BASE_URL: string;

  // tslint:disable-next-line: member-ordering
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    rewind: true,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 3
      }
    },
    nav: true
  }



  // tslint:disable-next-line: member-ordering
  newArivalSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    rewind: true,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  scrollingImages: any;

  bestSalesImages: any;

  newArrivals: any;





  ngOnInit(): void {
    this.getScrollingImageData();
    this.getbestSalesData();
    this.getnewarrivalsData();
  }


  loadMoreItems() {
    this.loadMoreBestSales = this.loadMoreBestSales + 4;
  }

  getScrollingImageData() {
    this.indexService.getDataByType('scrollingimage').subscribe((data: any) => {
      if (data.success) {
        this.Loading1 = false;
        this.scrollingImages = data.data;
      }
      else {
        this.Loading1 = true;
      }
    })
  }

  getnewarrivalsData() {
    this.indexService.getDataByType('newarrivals').subscribe((data: any) => {
      if (data.success) {
        this.Loading2 = false;
        this.newArrivals = data.data;
      }
      else {
        this.Loading2 = true;
      }
    })
  }

  getbestSalesData() {
    this.indexService.getDataByType('bestsales').subscribe((data: any) => {
      if (data.success) {
        this.Loading3 = false;
        this.bestSalesImages = data.data;
      }
      else {
        this.Loading3 = true;
      }
    })

  }
}
