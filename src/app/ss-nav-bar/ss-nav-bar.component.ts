import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd  } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ss-nav-bar',
  templateUrl: './ss-nav-bar.component.html',
  styleUrls: ['./ss-nav-bar.component.css']
})
export class SsNavBarComponent {
  	isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    	.pipe(
      		map(result => result.matches)
    	);

    isLogin = false;
  	constructor(
  		private breakpointObserver: BreakpointObserver,
  		private router:Router
  	){
  		router.events.subscribe(event => {
	      	if (event instanceof NavigationEnd ) {
	        	console.log("current url",event.url); // event.url has current url
	        	// your code will goes here
	        	if(event.url == '/dashboard/donor' || event.url == '/dashboard/seeker'){
	        		this.isLogin = true;
	        	}
	      	}
    	});
  	}

}
