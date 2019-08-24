import { User } from './user.model';

export interface Barn {
    _id?: string;
    name: string;
    start_period: Date;
    end_period: Date;
    release_date?: Date;
    owner: User;
    carrot_per_employee: number;
    total_carrot: number;
    is_deleted?: boolean;
    is_active?: boolean;
    excluded?: Array<string>;
}

export interface BarnExtention extends Barn {
    barn: Barn;
    total_employee: number;
    carrot_left: number;
}
