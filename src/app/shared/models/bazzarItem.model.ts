import { Bazzar } from './bazzar.model';

export interface BazzarItem {
  _id?: string;
  bazzar: Bazzar;
  name: string;
  quantity: number;
  desc: string;
  rate: number;
  images?: string;
}
