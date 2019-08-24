import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectRoleComponent } from './select-role/select-role.component';
import { TitleBackComponent } from './title-back/title-back.component';
import { AngularMaterialModule } from '../modules/angular-material.module';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    SelectRoleComponent,
    TitleBackComponent,
    LoadingComponent
  ],
  exports: [
    SelectRoleComponent,
    TitleBackComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  entryComponents: [
    LoadingComponent
  ]
})
export class SharedComponentModule {}
