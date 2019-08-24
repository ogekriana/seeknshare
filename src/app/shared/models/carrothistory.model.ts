import { User } from './user.model';

export enum CarrotType {
  ManagerShared = 'Manager Shared',
  FarmerShared = 'Farmer Shared',
  InitialCarrot = 'Initial Carrot',
  Redeem = 'Redeem',
  EmployeeShared = 'Employee Shared'
}

export interface CarrotHistory {
  _id?: string;
  owner?: string;
  description?: string;
  type?: CarrotType;
  amount?: string;
  destination?: string;
  barn?: string;
  date?: Date;
}

export interface CarrotHistoryExtension {
  History: CarrotHistory;
  ownerUser: User;
  destinationUser: User;
}
