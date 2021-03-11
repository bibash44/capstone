import { ConfigService } from './../../config.service';
import { MobilesService } from './mobiles.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mobiles',
  templateUrl: './mobiles.component.html',
  styleUrls: ['./mobiles.component.scss']
})
export class MobilesComponent implements OnInit {

  private loggedInUserData: any;
  private token: any;



  public mobilesFormGroup: FormGroup;
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



  displayedColumns: string[] = ['id', 'name', 'brand', 'model', 'ram', 'storage', 'resolution', 'screensize', 'price', 'warrenty', 'description', 'image', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private clothingFormBuilder: FormBuilder,
    private mobileService: MobilesService,
    private configService: ConfigService) {

    this.BASE_URL = this.configService.BASE_URL();

    this.mobilesFormGroup = this.clothingFormBuilder.group({

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

      ram: ['', [
        Validators.required,
      ]],

      storage: ['', [
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

    this.configService.isUserTryingToAccessAdminPAges();

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
    this.mobileService.getallItems(this.token).subscribe((data: any) => {
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


    this.mobilesFormGroup.controls.id.setValue(editformvalues.id);
    this.mobilesFormGroup.controls.name.setValue(editformvalues.name);
    this.mobilesFormGroup.controls.brand.setValue(editformvalues.brand);
    this.mobilesFormGroup.controls.model.setValue(editformvalues.model);
    this.mobilesFormGroup.controls.ram.setValue(editformvalues.ram);
    this.mobilesFormGroup.controls.storage.setValue(editformvalues.storage);
    this.mobilesFormGroup.controls.resolution.setValue(editformvalues.resolution);
    this.mobilesFormGroup.controls.screensize.setValue(editformvalues.screensize);
    this.mobilesFormGroup.controls.price.setValue(editformvalues.price);
    this.mobilesFormGroup.controls.warrenty.setValue(editformvalues.warrenty);
    this.mobilesFormGroup.controls.description.setValue(editformvalues.description);


    this.previewUrl = this.BASE_URL + 'upload/images/' + editformvalues.image;
    this.imageNameFromServer = editformvalues.image;

  }

  openAddItemFormDiaglouge() {
    this.isAddingItem = true;
    this.buttonTextAndHeading = 'Add item';
    this.openForm = true;

    this.mobilesFormGroup.controls.id.setValue(null);
    this.mobilesFormGroup.controls.name.setValue(null);
    this.mobilesFormGroup.controls.brand.setValue(null);
    this.mobilesFormGroup.controls.model.setValue(null);
    this.mobilesFormGroup.controls.ram.setValue(null);
    this.mobilesFormGroup.controls.storage.setValue(null);
    this.mobilesFormGroup.controls.resolution.setValue(null);
    this.mobilesFormGroup.controls.screensize.setValue(null);
    this.mobilesFormGroup.controls.price.setValue(null);
    this.mobilesFormGroup.controls.warrenty.setValue(null);
    this.mobilesFormGroup.controls.description.setValue(null);

    this.previewUrl = null;
    this.imageNameFromServer = null;

  }

  openDeleteItemFormDiaglouge(deletFormValue) {
    this.mobilesFormGroup.controls.id.setValue(deletFormValue.id);
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

      this.mobileService.uploadImage(formData).subscribe((data: any) => {
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

      name: this.mobilesFormGroup.get('name').value,
      model: this.mobilesFormGroup.get('model').value,
      brand: this.mobilesFormGroup.get('brand').value,
      ram: this.mobilesFormGroup.get('ram').value,
      storage: this.mobilesFormGroup.get('storage').value,
      resolution: this.mobilesFormGroup.get('resolution').value,
      screensize: this.mobilesFormGroup.get('screensize').value,
      price: this.mobilesFormGroup.get('price').value,
      warrenty: this.mobilesFormGroup.get('warrenty').value,
      description: this.mobilesFormGroup.get('description').value,
      image: this.imageNameFromServer,
    };

    this.mobileService.addItem(setFormData, this.token).subscribe((data: any) => {
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
      id: this.mobilesFormGroup.get('id').value,
      name: this.mobilesFormGroup.get('name').value,
      model: this.mobilesFormGroup.get('model').value,
      brand: this.mobilesFormGroup.get('brand').value,
      ram: this.mobilesFormGroup.get('ram').value,
      storage: this.mobilesFormGroup.get('storage').value,
      resolution: this.mobilesFormGroup.get('resolution').value,
      screensize: this.mobilesFormGroup.get('screensize').value,
      price: this.mobilesFormGroup.get('price').value,
      warrenty: this.mobilesFormGroup.get('warrenty').value,
      description: this.mobilesFormGroup.get('description').value,
      image: this.imageNameFromServer,
    };



    this.mobileService.updateItem(setFormData, this.token).subscribe((data: any) => {
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
      id: this.mobilesFormGroup.get('id').value
    };

    this.mobileService.deleteItem(setFormData, this.token).subscribe((data: any) => {
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
