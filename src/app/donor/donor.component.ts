import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {
	activeContainer = 'submission';
	files: any = [];
  	constructor() { }

  	ngOnInit() {
  	}

  	uploadFile(event) {
	    for (let index = 0; index < event.length; index++) {
	      const element = event[index];
	      this.files.push(element.name)
	    }  
	  }
	  deleteAttachment(index) {
	    this.files.splice(index, 1)
	  }
}
