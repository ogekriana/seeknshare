import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTreeModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatStepperModule,
  MatSelectModule,
  MatRadioModule,
  MatChipsModule
} from '@angular/material';

import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgoComponent } from './ngo/ngo.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SsNavBarComponent } from './ss-nav-bar/ss-nav-bar.component';
import { SsTreeComponent } from './ss-tree/ss-tree.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DonorComponent } from './donor/donor.component';
import { SeekerComponent } from './seeker/seeker.component';
import { DragDropDirective } from './directives/drag-drop.directive';

const appRoutes: Routes = [
  { path: '', 
    component: HomeComponent 
  },
  { path: 'detail', 
    component: ProductDetailComponent 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'ngo',
    component: NgoComponent
  },
  { 
    path: 'dashboard',
    component: DashboardComponent,
    children: [
        {
          path: 'donor',
          component: DonorComponent
        },
        {
          path: 'seeker',
          component: SeekerComponent
        }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    NgoComponent,
    UserDashboardComponent,
    SsNavBarComponent,
    SsTreeComponent,
    SearchbarComponent,
    ProductDetailComponent,
    DonorComponent,
    SeekerComponent,
    DragDropDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTreeModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
