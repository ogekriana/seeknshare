import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'carrot-title-back',
  templateUrl: './title-back.component.html',
  styleUrls: ['./title-back.component.css']
})
export class TitleBackComponent implements OnInit {
  @Input() title: string;
  @Input() link: string;
  @Output() actionClick = new EventEmitter<any>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  onClick(routerLink: string): void {
    this.router.navigate([routerLink], {relativeTo: this.route});
  }
}
