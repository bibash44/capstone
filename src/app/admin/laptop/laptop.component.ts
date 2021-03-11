import { ConfigService } from './../../config.service';
import { LaptopService } from './laptop.service';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.scss']
})
export class LaptopComponent implements OnInit {


  private loggedInUserData: any;
  private token: any;



  public laptopFormGroup: FormGroup;
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



  displayedColumns: string[] = ['id', 'name', 'brand', 'model', 'ram', 'storage', 'processer', 'generation', 'graphics', 'resolution', 'screensize', 'price', 'warrenty', 'description', 'image', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private clothingFormBuilder: FormBuilder,
    private laptopservice: LaptopService,
    private configservice: ConfigService) {

    this.BASE_URL = this.configservice.BASE_URL();

    this.laptopFormGroup = this.clothingFormBuilder.group({

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

      processer: ['', [
        Validators.required,
      ]],

      generation: ['', [
        Validators.required,
      ]],

      graphics: ['', [
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
    this.laptopservice.getallItems(this.token).subscribe((data: any) => {
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


    this.laptopFormGroup.controls.id.setValue(editformvalues.id);
    this.laptopFormGroup.controls.name.setValue(editformvalues.name);
    this.laptopFormGroup.controls.brand.setValue(editformvalues.brand);
    this.laptopFormGroup.controls.model.setValue(editformvalues.model);
    this.laptopFormGroup.controls.ram.setValue(editformvalues.ram);
    this.laptopFormGroup.controls.storage.setValue(editformvalues.storage);
    this.laptopFormGroup.controls.processer.setValue(editformvalues.processer);
    this.laptopFormGroup.controls.generation.setValue(editformvalues.generation);
    this.laptopFormGroup.controls.graphics.setValue(editformvalues.graphics);
    this.laptopFormGroup.controls.resolution.setValue(editformvalues.resolution);
    this.laptopFormGroup.controls.screensize.setValue(editformvalues.screensize);
    this.laptopFormGroup.controls.price.setValue(editformvalues.price);
    this.laptopFormGroup.controls.warrenty.setValue(editformvalues.warrenty);
    this.laptopFormGroup.controls.description.setValue(editformvalues.description);


    this.previewUrl = this.BASE_URL + 'upload/images/' + editformvalues.image;
    this.imageNameFromServer = editformvalues.image;

  }

  openAddItemFormDiaglouge() {
    this.isAddingItem = true;
    this.buttonTextAndHeading = 'Add item';
    this.openForm = true;

    this.laptopFormGroup.controls.id.setValue(null);
    this.laptopFormGroup.controls.name.setValue(null);
    this.laptopFormGroup.controls.brand.setValue(null);
    this.laptopFormGroup.controls.model.setValue(null);
    this.laptopFormGroup.controls.ram.setValue(null);
    this.laptopFormGroup.controls.storage.setValue(null);
    this.laptopFormGroup.controls.processer.setValue(null);
    this.laptopFormGroup.controls.generation.setValue(null);
    this.laptopFormGroup.controls.graphics.setValue(null);
    this.laptopFormGroup.controls.resolution.setValue(null);
    this.laptopFormGroup.controls.screensize.setValue(null);
    this.laptopFormGroup.controls.price.setValue(null);
    this.laptopFormGroup.controls.warrenty.setValue(null);
    this.laptopFormGroup.controls.description.setValue(null);

    this.previewUrl = null;
    this.imageNameFromServer = null;

  }

  openDeleteItemFormDiaglouge(deletFormValue) {
    this.laptopFormGroup.controls.id.setValue(deletFormValue.id);
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

      this.laptopservice.uploadImage(formData).subscribe((data: any) => {
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

      name: this.laptopFormGroup.get('name').value,
      model: this.laptopFormGroup.get('model').value,
      brand: this.laptopFormGroup.get('brand').value,
      ram: this.laptopFormGroup.get('ram').value,
      storage: this.laptopFormGroup.get('storage').value,
      processer: this.laptopFormGroup.get('processer').value,
      generation: this.laptopFormGroup.get('generation').value,
      graphics: this.laptopFormGroup.get('graphics').value,
      resolution: this.laptopFormGroup.get('resolution').value,
      screensize: this.laptopFormGroup.get('screensize').value,
      price: this.laptopFormGroup.get('price').value,
      warrenty: this.laptopFormGroup.get('warrenty').value,
      description: this.laptopFormGroup.get('description').value,
      image: this.imageNameFromServer,
    };

    this.laptopservice.addItem(setFormData, this.token).subscribe((data: any) => {
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
      id: this.laptopFormGroup.get('id').value,
      name: this.laptopFormGroup.get('name').value,
      model: this.laptopFormGroup.get('model').value,
      brand: this.laptopFormGroup.get('brand').value,
      ram: this.laptopFormGroup.get('ram').value,
      storage: this.laptopFormGroup.get('storage').value,
      processer: this.laptopFormGroup.get('processer').value,
      generation: this.laptopFormGroup.get('generation').value,
      graphics: this.laptopFormGroup.get('graphics').value,
      resolution: this.laptopFormGroup.get('resolution').value,
      screensize: this.laptopFormGroup.get('screensize').value,
      price: this.laptopFormGroup.get('price').value,
      warrenty: this.laptopFormGroup.get('warrenty').value,
      description: this.laptopFormGroup.get('description').value,
      image: this.imageNameFromServer,
    };



    this.laptopservice.updateItem(setFormData, this.token).subscribe((data: any) => {
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
      id: this.laptopFormGroup.get('id').value
    };

    this.laptopservice.deleteItem(setFormData, this.token).subscribe((data: any) => {
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
