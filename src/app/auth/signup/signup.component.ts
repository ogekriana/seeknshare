import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

import { AuthService } from './../../shared/services/auth.service';
import { RoleType } from './../../shared/models/role.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loginForm: FormGroup;

  message = 'Invalid signup credential. Please check your data!';
  actionButtonLabel = 'Close';
  action = true;
  setAutoHide = false;
  autoHide = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isHidden = true;

  addExtraClass = false;

  showLogin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
    this.signupForm = this.generateForm();
    this.loginForm = this.generateForm();
  }

  generateForm() {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submitSignup() {
    // this.authService.signup(this.signupForm.controls.username.value, this.signupForm.controls.password.value)
    //   .subscribe(res => {
    //       if (res.auth) {

    //         /*redirect to route based on role*/
    //         if (res.user.role.role_type === RoleType.Administrator) {
    //           this.router.navigate(['/administrator']);
    //         } else if (res.user.role.role_type === RoleType.Employee) {
    //           this.router.navigate(['/employee']);
    //         } else if (res.user.role.role_type === RoleType.Manager) {
    //           this.router.navigate(['/manager']);
    //         } else if (res.user.role.role_type === RoleType.Farmer) {
    //           this.router.navigate(['/farmer']);
    //         } else if (res.user.role.role_type === RoleType.Merchant) {
    //           this.router.navigate(['/merchant']);
    //         } else {
    //           this.router.navigate(['/home']);
    //         }
    //       }
    //   });

  }

  hidePassword(hide) {
    return this.isHidden = !hide;
  }
}
