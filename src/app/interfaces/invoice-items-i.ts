export interface InvoiceItemsI {
  id:number;
  description:string;
  quantity:number;
  unitPrice:number;
  taxRate:number;
  total?:number;
}
