import { CategoryService } from './category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from 'src/app/config.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  loadMoreItems = 4;
  subCategory: string;
  Category: string;
  searchKeyWord = 'name';

  loading = true;



  dataList: any;
  dataList2: any;

  public BASE_URL: string;

  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private configservice: ConfigService) {
    this.BASE_URL = this.configservice.BASE_URL();
  }

  fnloadMoreItems() {
    this.loadMoreItems = this.loadMoreItems + 4;
  }

  changeSearchKeyword(event) {
    this.searchKeyWord = event.target.value;
  }

  applyFilter(event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.searchKeyWord === 'name') {
      this.dataList = this.dataList.filter(result => result.name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()));
    }

    else if (this.searchKeyWord === 'price') {
      this.dataList = this.dataList.filter(result => result.price.toLocaleLowerCase().contains(filterValue.toLocaleLowerCase()));

    }


    const key = event.keyCode || event.charCode;
    if (key === 8 || key === 46) {

      if (filterValue === '') {
        this.dataList = this.dataList2;
      }
    }

  }


  sort(event) {
    const sortKeyword = event.target.value;
    if (sortKeyword === '1') {
      let b = this.dataList.sort((a, b) => 0 - (a.name > b.name ? -1 : 1));
      this.dataList = b;
    }

    else if (sortKeyword === '2') {
      let b = this.dataList.sort((a, b) => 0 - (a.name > b.name ? 1 : -1));
      this.dataList = b;
    }

    else if (sortKeyword === '3') {
      let b = this.dataList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      this.dataList = b;
    }

    else if (sortKeyword === '4') {
      let b = this.dataList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      this.dataList = b;
    }

  }





  ngOnInit(): void {

    this.route.snapshot.paramMap.get('category');
    this.route.paramMap.subscribe(params => {
      this.subCategory = params.get('subcategory').toString().toUpperCase();
      this.Category = params.get('category').toString().toUpperCase();
    })


    if (this.Category.toLocaleLowerCase() === 'electronics') {
      this.getElectronisItemsByCategory();
    }
    else {
      this.getItemsBySubCategory();
    }


  }

  getItemsBySubCategory() {
    this.categoryService.getItemsBySubCategory(this.Category.toLocaleLowerCase(), this.subCategory.toLocaleLowerCase()).
      subscribe((data: any) => {
        if (data.success) {
          this.loading = false;
          this.dataList = data.data;
          this.dataList2 = data.data;
        }
        else {
          this.loading = true;
        }
      })
  }

  getElectronisItemsByCategory() {
    this.categoryService.getElectronisItemsByCategory(this.subCategory.toLocaleLowerCase()).subscribe((data: any) => {
      if (data.success) {
        this.loading = false;
        this.dataList = data.data;
        this.dataList2 = data.data;
      }
      else {
        this.loading = true;
      }
    })
  }


}
