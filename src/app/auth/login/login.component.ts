import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

import { AuthService } from './../../shared/services/auth.service';
import { RoleType } from './../../shared/models/role.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  message = 'Invalid login credential. Please check your data!';
  actionButtonLabel = 'Close';
  action = true;
  setAutoHide = false;
  autoHide = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isHidden = true;

  addExtraClass = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
    this.loginForm = this.generateForm();
  }

  generateForm() {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submitLogin() {
    this.authService.login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
      .subscribe(res => {
          if (res.auth) {

            /*redirect to route based on role*/
            if (res.user.role.role_type === RoleType.Administrator) {
              this.router.navigate(['/administrator']);
            } else if (res.user.role.role_type === RoleType.Employee) {
              this.router.navigate(['/employee']);
            } else if (res.user.role.role_type === RoleType.Manager) {
              this.router.navigate(['/manager']);
            } else if (res.user.role.role_type === RoleType.Farmer) {
              this.router.navigate(['/farmer']);
            } else if (res.user.role.role_type === RoleType.Merchant) {
              this.router.navigate(['/merchant']);
            } else {
              this.router.navigate(['/home']);
            }
          }
      });

  }

  hidePassword(hide) {
    return this.isHidden = !hide;
  }
}
