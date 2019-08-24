import { Role } from './role.model';

export interface User {
  _id?: string;
  role: Role;
  username: string;
  birth_date?: string;
  join_date?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  is_deleted?: boolean;
  is_active?: boolean;
  image?: string;
}

export interface UserExtention extends User {
    isSelected?: boolean;
    group_count?: number;
    member_count?: number;
}
