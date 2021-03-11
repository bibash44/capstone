import { SignupService } from './signup.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public signupFormGroup: FormGroup;
  responseSuccess: boolean;
  responseFailed: boolean;
  responseText: string;
  loading: any;

  loggedInUserData: any;
  isUserLoggedIn = false;


  hide = true;
  weakpassword = false;
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

  constructor(private signUpFormBuilder: FormBuilder, private signUpService: SignupService, private _router: Router) {
    this.signupFormGroup = this.signUpFormBuilder.group({

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

      password: ['', [
        Validators.required,
        Validators.pattern('.{8,}'),
      ]],
    })
  }

  getLoggedInUserData() {
    this.loggedInUserData = JSON.parse(window.localStorage.getItem('LOGGEDIN_USER_DATA'));
    if (this.loggedInUserData) {
      if (this.loggedInUserData.loggedin) {
        this.isUserLoggedIn = true;
        if (this.loggedInUserData.userData.data.usertype === 'user') {
          this._router.navigate(['/profile']);
        }

        else if (this.loggedInUserData.userData.data.usertype === 'admin') {
          this._router.navigate(['/admin']);
        }
      }
    }
  }

  submitSignup() {
    this.loading = true;
    this.signUpService.sugbmiSignUp(this.signupFormGroup.value).subscribe((userdata: any) => {
      if (userdata.success) {
        this.loading = false;
        this.responseSuccess = true;
        this.responseFailed = false;
        this.responseText = userdata.message;
        this.signupFormGroup.controls.fname.setValue(null);
        this.signupFormGroup.controls.lname.setValue(null);
        this.signupFormGroup.controls.state.setValue(null);
        this.signupFormGroup.controls.phone.setValue(null);
        this.signupFormGroup.controls.zip.setValue(null);
        this.signupFormGroup.controls.password.setValue(null);
        this.signupFormGroup.controls.email.setValue(null);
      }
      else {
        this.loading = false;
        this.responseFailed = true;
        this.responseSuccess = false;
        this.loading = false;
        this.responseText = userdata.message;

      }
    }, (error: HttpErrorResponse) => {
      this.loading = false;
      this.responseFailed = true;
      this.responseSuccess = false;
      this.responseText = error.statusText;
    });
  }

  ngOnInit(): void {
    this.getLoggedInUserData();
  }

}
