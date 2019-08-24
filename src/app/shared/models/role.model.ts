export interface Role {
    _id?: string;
    role_name: string;
    role_type: string;
    is_deleted?: boolean;
}


export enum RoleType {
  Administrator = 'Administrator',
  Farmer = 'Farmer',
  Manager = 'Manager',
  Employee = 'Employee',
  Merchant = 'Merchant'
}
