import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { 
            title: 'Card 1', cols: 3, rows: 1, 
            image: './assets/images/home2.jpg',
            caption: 'Girls Bag',
            price: '500.000'
          },
          { title: 'Card 2', cols: 3, rows: 1, 
            image: './assets/images/home1.jpg',
            caption: 'Vintage Denim Jacket',
            price: '300.000' 
          },
          { title: 'Card 3', cols: 3, rows: 1,
            image: './assets/images/home3.jpg',
            caption: 'Denim Pants',
            price: '200.000' 
          },
          { title: 'Card 3', cols: 3, rows: 1, 
            image: './assets/images/home3.jpg',
            caption: 'Simple clothes',
            price: '500.000' 
          },
          { title: 'Card 3', cols: 3, rows: 1,
            image: './assets/images/home1.jpg',
            caption: 'Simple clothes',
            price: '600.000'  
          },
          { title: 'Card 4', cols: 3, rows: 1,
            image: './assets/images/home2.jpg',
            caption: 'Simple clothes',
            price: '50.000' 
          }
        ];
      }

      return [
          { 
            title: 'Card 1', cols: 1, rows: 1, 
            image: './assets/images/home2.jpg',
            caption: 'Girls Bag',
            price: '500.000'
          },
          { title: 'Card 2', cols: 1, rows: 1,
            image: './assets/images/home1.jpg',
            caption: 'Vintage Denim Jacket',
            price: '300.000' 
          },
          { title: 'Card 3', cols: 1, rows: 1,
            image: './assets/images/home3.jpg',
            caption: 'Denim Pants',
            price: '200.000' 
          },
          { title: 'Card 3', cols: 1, rows: 1, 
            image: './assets/images/home3.jpg',
            caption: 'Simple clothes',
            price: '500.000' 
          },
          { title: 'Card 3', cols: 1, rows: 1,
            image: './assets/images/home1.jpg',
            caption: 'Simple clothes',
            price: '600.000'  
          },
          { title: 'Card 4', cols: 1, rows: 1,
            image: './assets/images/home2.jpg',
            caption: 'Simple clothes',
            price: '50.000' 
          }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
