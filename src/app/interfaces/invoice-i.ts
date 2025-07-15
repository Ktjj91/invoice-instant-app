import {Status} from '../enum/StatusEnum';
import {InvoiceItemsI} from './invoice-items-i';

export interface InvoiceI {
  id:number;
  number:number;
  status: Status,
  invoiceDate: Date;
  dueDate: Date;
  total: number;
  note?:string;
  createdAt: Date;
  client: {
    id:number;
    firstName:string;
    lastName:string;
  };
  invoiceItems: InvoiceItemsI[];




}
