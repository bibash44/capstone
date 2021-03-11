import { ProfileService } from './profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public updateFormGroup: FormGroup;

  states = [
    { state: 'Alabama' },
    { state: 'Alaska' },
    { state: 'Arizona' },
    { state: 'Arkansas' },
    { state: 'California' },
    { state: 'Colorado' },
    { state: 'Connecticut' },
    { state: 'Delaware' },
    { state: 'Florida' },
    { state: 'Georgia' },
    { state: 'Hawaii' },
    { state: 'Idaho' },
    { state: 'IllinoisIndiana' },
    { state: 'Iowa' },
    { state: 'Kansas' },
    { state: 'Kentucky' },
    { state: 'Louisiana' },
    { state: 'Maine' },
    { state: 'Maryland' },
    { state: 'Massachusetts' },
    { state: 'Michigan' },
    { state: 'Minnesota' },
    { state: 'Mississippi' },
    { state: 'Missouri' },
    { state: 'MontanaNebraska' },
    { state: 'Nevada' },
    { state: 'New Hampshire' },
    { state: 'New Jersey' },
    { state: 'New Mexico' },
    { state: 'New York' },
    { state: 'North Carolina' },
    { state: 'North Dakota' },
    { state: 'Ohio' },
    { state: 'Oklahoma' },
    { state: 'Oregon' },
    { state: 'PennsylvaniaRhode Island' },
    { state: 'South Carolina' },
    { state: 'South Dakota' },
    { state: 'Tennessee' },
    { state: 'Texas' },
    { state: 'Utah' },
    { state: 'Vermont' },
    { state: 'Virginia' },
    { state: 'Washington' },
    { state: 'West Virginia' },
    { state: 'Wisconsin' },
    { state: 'Wyoming' },
  ];

  loggedInUserData: any;
  isUserLoggedIn: any;

  @ViewChild('updateProfileDiagouge') updateProfileDiagouge: TemplateRef<any>;
  @ViewChild('confirmLogoutDialouge') confirmLogoutDialouge: TemplateRef<any>;

  constructor(private loginFormBuilder: FormBuilder, private dialog: MatDialog, private profileSerice: ProfileService, private _snackBar: MatSnackBar) {
    this.updateFormGroup = this.loginFormBuilder.group({

      id: [''],

      fname: ['', [
        Validators.required,
        Validators.pattern('[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$')
      ]],

      lname: ['', [
        Validators.required,
        Validators.pattern('[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$')
      ]],

      phone: ['', [
        Validators.required,
        Validators.pattern('[+ 0-9].{9,15}')

      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      state: ['', [
        Validators.required,
      ]],

      zip: ['', [
        Validators.required,
        Validators.pattern('.{5,}')
      ]],

    })
  }


  ngOnInit(): void {
    this.getLoggedInUserData();
  }

  getLoggedInUserData() {
    this.loggedInUserData = JSON.parse(window.localStorage.getItem('LOGGEDIN_USER_DATA'));
    if (this.loggedInUserData) {
      if (this.loggedInUserData.loggedin) {
        this.isUserLoggedIn = true;
        this.updateFormGroup.controls.id.setValue(this.loggedInUserData.userData.data.id);
        this.updateFormGroup.controls.fname.setValue(this.loggedInUserData.userData.data.fname);
        this.updateFormGroup.controls.lname.setValue(this.loggedInUserData.userData.data.lname);
        this.updateFormGroup.controls.phone.setValue(this.loggedInUserData.userData.data.phone);
        this.updateFormGroup.controls.email.setValue(this.loggedInUserData.userData.data.email);
        this.updateFormGroup.controls.state.setValue(this.loggedInUserData.userData.data.state);
        this.updateFormGroup.controls.zip.setValue(this.loggedInUserData.userData.data.zip);
      }
    }
  }



  updateProfile() {
    this.dialog.open(this.updateProfileDiagouge);
  }

  confirmUpdate() {
    console.log(this.updateFormGroup.value)

    this.profileSerice.updateUser(this.updateFormGroup.value, this.loggedInUserData.token).subscribe((data: any) => {
      if (data.success) {

        this._snackBar.open('Profile updated');

        setTimeout(() => {
          this.logoutUser();
        }, 1500);
      }
      else {
        //
      }
    });

  }

  logoutUser() {
    window.localStorage.removeItem('LOGGEDIN_USER_DATA');
    window.location.href = '/';
  }

  confirmLogout() {
    this.dialog.open(this.confirmLogoutDialouge);
  }
}
