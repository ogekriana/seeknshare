import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrls: ['./seeker.component.css']
})
export class SeekerComponent implements OnInit {
	activeContainer = 'cart';
	isLinear = false;
  	firstFormGroup: FormGroup;
  	secondFormGroup: FormGroup;
  	shipping = "";

  	constructor(private _formBuilder: FormBuilder) { }

	ngOnInit() {
		this.firstFormGroup = this._formBuilder.group({
	      firstCtrl: ['', Validators.required]
	    });
	    this.secondFormGroup = this._formBuilder.group({
	      secondCtrl: ['', Validators.required],
	      duration: 1
	    });
	}
}
