import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RoleService } from './../../services/role.service'
import { Role } from './../../models/role.model'

@Component({
  selector: 'select-role',
  templateUrl: './select-role.component.html'
})
export class SelectRoleComponent implements OnInit {
  @Input() data: Role[];
  @Input() userForm: FormGroup;
  // roleList: Role[] = []

    constructor(
      private roleService: RoleService,
    ) { }

    ngOnInit() {
      // console.log("in the select component")
      // console.log(this.data)
    }

    getErrorMessage(controlName) {
      // return this.formControl.hasError('required') ? 'Required field' : '';
      return this.userForm.get(controlName).hasError('required') ? 'This field is required!' : '';
  }
}
