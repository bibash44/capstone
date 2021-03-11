import { ConfigService } from './../../config.service';
import { ShoesService } from './shoes.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-shoes',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.scss']
})
export class ShoesComponent implements OnInit {

  private loggedInUserData: any;
  private token: any;



  public shoesFormGroup: FormGroup;
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

  public BASE_URL: string;

  itemSize = [
    { size: '35' },
    { size: '36' },
    { size: '38' },
    { size: '39' },
    { size: '40' },
    { size: '41' },
    { size: '42' },
    { size: '43' },
    { size: '44' },
    { size: '45' },
    { size: '46' },
  ];

  itemType = [
    { type: 'men' },
    { type: 'women' },
    { type: 'kids' },
  ];

  displayedColumns: string[] = ['id', 'name', 'type', 'size', 'price', 'description', 'image', 'edit', 'delete'];
  dataSource = new MatTableDataSource();

  constructor(
    public dialog: MatDialog,
    private shoesFormBuilder: FormBuilder,
    private shoesService: ShoesService,
    private configservice: ConfigService) {

    this.BASE_URL = this.configservice.BASE_URL();

    this.shoesFormGroup = this.shoesFormBuilder.group({

      id: [],

      name: ['', [
        Validators.required,
      ]],

      type: ['', [
        Validators.required,
      ]],

      size: ['', [
        Validators.required,
      ]],

      price: ['', [
        Validators.required,
      ]],


      description: ['', [
        Validators.required,
      ]],


    });
  }



  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('addUpdateShoesFormDialouge') addUpdateShoesFormDialouge: TemplateRef<any>;
  @ViewChild('deleteShoesConfirmDialouge') deleteShoesConfirmDialouge: TemplateRef<any>;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
    this.shoesService.getallItems(this.token).subscribe((data: any) => {
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
    this.dialog.open(this.addUpdateShoesFormDialouge);


    this.shoesFormGroup.controls.id.setValue(editformvalues.id);
    this.shoesFormGroup.controls.name.setValue(editformvalues.name);
    this.shoesFormGroup.controls.type.setValue(editformvalues.type);
    this.shoesFormGroup.controls.size.setValue(editformvalues.size);
    this.shoesFormGroup.controls.price.setValue(editformvalues.price);
    this.shoesFormGroup.controls.description.setValue(editformvalues.description);


    this.previewUrl = this.BASE_URL + 'upload/images/' + editformvalues.image;
    this.imageNameFromServer = editformvalues.image;

  }

  openAddItemFormDiaglouge() {
    this.isAddingItem = true;
    this.buttonTextAndHeading = 'Add item';
    this.dialog.open(this.addUpdateShoesFormDialouge);

    this.shoesFormGroup.controls.id.setValue(null);
    this.shoesFormGroup.controls.name.setValue(null);
    this.shoesFormGroup.controls.type.setValue(null);
    this.shoesFormGroup.controls.size.setValue(null);
    this.shoesFormGroup.controls.price.setValue(null);
    this.shoesFormGroup.controls.description.setValue(null);

    this.previewUrl = null;
    this.imageNameFromServer = null;

  }

  openDeleteItemFormDiaglouge(deletFormValue) {
    this.shoesFormGroup.controls.id.setValue(deletFormValue.id);
    this.dialog.open(this.deleteShoesConfirmDialouge);
  }



  uploadImageToServer(fileInput: any) {
    this.signupAndUpdateLoading = true;
    this.fileData = (fileInput.target.files[0] as File);
    this.preview();
    const imageSize = this.fileData.size;
    const fileType = this.fileData.type;
    const isFileImage = fileType.split('/', 1);

    if (imageSize > 100000000) {

      window.alert('Image size is larger, please resize it');
      this.signupAndUpdateLoading = false;
    }

    else if (isFileImage[0] !== 'image') {

      window.alert('File is not image, please choose image')
      this.signupAndUpdateLoading = false;
    }


    else {
      const formData = new FormData();
      formData.append('image', this.fileData);

      this.shoesService.uploadImage(formData).subscribe((data: any) => {
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

  submitShoesData() {
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
      image: this.imageNameFromServer,
      name: this.shoesFormGroup.get('name').value,
      price: this.shoesFormGroup.get('price').value,
      size: this.shoesFormGroup.get('size').value,
      type: this.shoesFormGroup.get('type').value,
      description: this.shoesFormGroup.get('description').value
    };

    this.shoesService.addItem(setFormData, this.token).subscribe((data: any) => {
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
      id: this.shoesFormGroup.get('id').value,
      name: this.shoesFormGroup.get('name').value,
      price: this.shoesFormGroup.get('price').value,
      size: this.shoesFormGroup.get('size').value,
      type: this.shoesFormGroup.get('type').value,
      description: this.shoesFormGroup.get('description').value,
      image: this.imageNameFromServer,
    };



    this.shoesService.updateItem(setFormData, this.token).subscribe((data: any) => {
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
      id: this.shoesFormGroup.get('id').value
    };

    this.shoesService.deleteItem(setFormData, this.token).subscribe((data: any) => {
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
