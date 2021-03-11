import { ConfigService } from './../../config.service';
import { TvService } from './tv.service';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent implements OnInit {

  private loggedInUserData: any;
  private token: any;



  public tvFormGroup: FormGroup;
  isAddingItem = true;
  buttonTextAndHeading: string;

  public previewUrl: any = null;
  private fileData: File = null;
  pageLoading: any;
  signupAndUpdateLoading: any;
  imageNameFromServer: string;

  responseSuccess: boolean;
  responseFailed: boolean;
  responseText: string;

  openForm = false;

  public BASE_URL: string;


  type = [
    { type: 'LCD' },
    { type: 'LED' },
    { type: 'Smart' }
  ]

  displayedColumns: string[] = ['id', 'name', 'brand', 'model', 'type', 'resolution', 'screensize', 'price', 'warrenty', 'description', 'image', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private clothingFormBuilder: FormBuilder,
    private tvservice: TvService,
    private configservice: ConfigService) {

    this.BASE_URL = this.configservice.BASE_URL();

    this.tvFormGroup = this.clothingFormBuilder.group({

      id: [],

      name: ['', [
        Validators.required,
      ]],

      brand: ['', [
        Validators.required,
      ]],

      model: ['', [
        Validators.required,
      ]],

      type: ['', [
        Validators.required,
      ]],

      resolution: ['', [
        Validators.required,
      ]],

      screensize: ['', [
        Validators.required,
      ]],

      price: ['', [
        Validators.required,
      ]],

      warrenty: ['', [
        Validators.required,
      ]],

      description: ['', [
        Validators.required,
      ]],


    });
  }



  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('deleteClothingConfirmDialouge') deleteClothingConfirmDialouge: TemplateRef<any>;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  closeForm() {
    this.openForm = false;
  }


  ngOnInit(): void {

    this.configservice.isUserTryingToAccessAdminPAges();

    this.loggedInUserData = JSON.parse(window.localStorage.getItem('LOGGEDIN_USER_DATA'));
    if (this.loggedInUserData === null) {
      this.pageLoading = true;
      window.alert('User logged out, please login');
      return;
    }

    else {
      this.token = this.loggedInUserData.token;
      this.getAllItems();
    }

  }

  getAllItems() {
    this.pageLoading = true;
    this.tvservice.getallItems(this.token).subscribe((data: any) => {
      if (data.success) {
        this.pageLoading = false;
        this.dataSource.data = data.data;

      }
      else {
        this.pageLoading = false;
        window.alert(data.message);

      }
      // tslint:disable-next-line: no-shadowed-variable
    }, (error: HttpErrorResponse) => {
      window.alert(error.statusText);
    });
  }


  openUpdateItemFormDiaglouge(editformvalues) {
    this.isAddingItem = false;
    this.buttonTextAndHeading = 'Update item';
    this.openForm = true;


    this.tvFormGroup.controls.id.setValue(editformvalues.id);
    this.tvFormGroup.controls.name.setValue(editformvalues.name);
    this.tvFormGroup.controls.brand.setValue(editformvalues.brand);
    this.tvFormGroup.controls.model.setValue(editformvalues.model);
    this.tvFormGroup.controls.type.setValue(editformvalues.type);
    this.tvFormGroup.controls.resolution.setValue(editformvalues.resolution);
    this.tvFormGroup.controls.screensize.setValue(editformvalues.screensize);
    this.tvFormGroup.controls.price.setValue(editformvalues.price);
    this.tvFormGroup.controls.warrenty.setValue(editformvalues.warrenty);
    this.tvFormGroup.controls.description.setValue(editformvalues.description);


    this.previewUrl = this.BASE_URL + 'upload/images/' + editformvalues.image;
    this.imageNameFromServer = editformvalues.image;

  }

  openAddItemFormDiaglouge() {
    this.isAddingItem = true;
    this.buttonTextAndHeading = 'Add item';
    this.openForm = true;

    this.tvFormGroup.controls.id.setValue(null);
    this.tvFormGroup.controls.name.setValue(null);
    this.tvFormGroup.controls.brand.setValue(null);
    this.tvFormGroup.controls.model.setValue(null);
    this.tvFormGroup.controls.type.setValue(null);
    this.tvFormGroup.controls.resolution.setValue(null);
    this.tvFormGroup.controls.screensize.setValue(null);
    this.tvFormGroup.controls.price.setValue(null);
    this.tvFormGroup.controls.warrenty.setValue(null);
    this.tvFormGroup.controls.description.setValue(null);

    this.previewUrl = null;
    this.imageNameFromServer = null;

  }

  openDeleteItemFormDiaglouge(deletFormValue) {
    this.tvFormGroup.controls.id.setValue(deletFormValue.id);
    this.dialog.open(this.deleteClothingConfirmDialouge);
  }



  uploadImageToServer(fileInput: any) {
    this.signupAndUpdateLoading = true;
    this.fileData = (fileInput.target.files[0] as File);
    this.preview();
    const imageSize = this.fileData.size;
    const fileType = this.fileData.type;
    const isFileImage = fileType.split('/', 1);

    if (imageSize > 100000000) {

      window.alert('Image model is larger, please remodel it');
      this.signupAndUpdateLoading = false;
    }

    else if (isFileImage[0] !== 'image') {

      window.alert('File is not image, please choose image')
      this.signupAndUpdateLoading = false;
    }


    else {
      const formData = new FormData();
      formData.append('image', this.fileData);

      this.tvservice.uploadImage(formData).subscribe((data: any) => {
        this.signupAndUpdateLoading = false;
        this.imageNameFromServer = data.image;


      }, (error: HttpErrorResponse) => {
        this.signupAndUpdateLoading = false;
        this.responseFailed = true;
        this.responseSuccess = false;
        this.responseText = error.statusText;
      });

    }
  }
  preview() {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };

  }

  submitClothingsData() {
    if (this.isAddingItem) {
      this.addItem();
    }
    else {
      this.updateItem();
    }
  }

  addItem() {
    // console.log(this.imageNameFromServer)
    this.signupAndUpdateLoading = true;
    const setFormData = {

      name: this.tvFormGroup.get('name').value,
      model: this.tvFormGroup.get('model').value,
      brand: this.tvFormGroup.get('brand').value,
      type: this.tvFormGroup.get('type').value,
      resolution: this.tvFormGroup.get('resolution').value,
      screensize: this.tvFormGroup.get('screensize').value,
      price: this.tvFormGroup.get('price').value,
      warrenty: this.tvFormGroup.get('warrenty').value,
      description: this.tvFormGroup.get('description').value,
      image: this.imageNameFromServer,
    };

    this.tvservice.addItem(setFormData, this.token).subscribe((data: any) => {
      if (data.success) {
        this.signupAndUpdateLoading = false;
        this.responseSuccess = true;
        this.responseFailed = false;
        this.responseText = data.message;

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else {
        this.signupAndUpdateLoading = false;
        this.responseFailed = true;
        this.responseSuccess = false;
        this.signupAndUpdateLoading = false;
        this.responseText = data.message;

      }
      // tslint:disable-next-line: no-shadowed-variable
    }, (error: HttpErrorResponse) => {
      this.signupAndUpdateLoading = false;
      this.responseFailed = true;
      this.responseSuccess = false;
      this.responseText = error.statusText;
    });
  }

  updateItem() {
    // console.log(this.imageNameFromServer)
    this.signupAndUpdateLoading = true;
    const setFormData = {
      id: this.tvFormGroup.get('id').value,
      name: this.tvFormGroup.get('name').value,
      model: this.tvFormGroup.get('model').value,
      brand: this.tvFormGroup.get('brand').value,
      type: this.tvFormGroup.get('type').value,
      resolution: this.tvFormGroup.get('resolution').value,
      screensize: this.tvFormGroup.get('screensize').value,
      price: this.tvFormGroup.get('price').value,
      warrenty: this.tvFormGroup.get('warrenty').value,
      description: this.tvFormGroup.get('description').value,
      image: this.imageNameFromServer,
    };



    this.tvservice.updateItem(setFormData, this.token).subscribe((data: any) => {
      if (data.success) {
        this.signupAndUpdateLoading = false;
        this.responseSuccess = true;
        this.responseFailed = false;
        this.responseText = data.message;

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else {
        this.signupAndUpdateLoading = false;
        this.responseFailed = true;
        this.responseSuccess = false;
        this.signupAndUpdateLoading = false;
        this.responseText = data.message;

      }
      // tslint:disable-next-line: no-shadowed-variable
    }, (error: HttpErrorResponse) => {
      this.signupAndUpdateLoading = false;
      this.responseFailed = true;
      this.responseSuccess = false;
      this.responseText = error.statusText;
    });
  }


  deleteItem() {
    // console.log(this.imageNameFromServer)
    this.pageLoading = true;
    const setFormData = {
      id: this.tvFormGroup.get('id').value
    };

    this.tvservice.deleteItem(setFormData, this.token).subscribe((data: any) => {
      if (data.success) {
        this.pageLoading = false;

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
      else {
        this.pageLoading = false;

      }
      // tslint:disable-next-line: no-shadowed-variable
    }, (error: HttpErrorResponse) => {
      this.pageLoading = false;
      window.alert(error.statusText);
    });
  }

}
