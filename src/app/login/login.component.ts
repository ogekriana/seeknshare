import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  showLogin = true;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.signupForm = this.generateForm();
    this.loginForm = this.generateForm();
  }

  generateForm() {
    return new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  submitLogin() {
    this.router.navigate(['/dashboard/donor']);
  }

  hidePassword(hide) {
    return this.isHidden = !hide;
  }
}
