import { User } from './user.model';

export interface UserGroup {
    _id?: string;
   user:User;
   manager:User;
}
