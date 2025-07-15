import {Component, signal} from '@angular/core';
import {InvoiceForm} from '../invoice-form/invoice-form';
import {InvoiceI} from '../../interfaces/invoice-i';

@Component({
  selector: 'app-create-invoice',
  imports: [
    InvoiceForm
  ],
  templateUrl: './create-invoice.html',
  styleUrl: './create-invoice.css'
})
export class CreateInvoice {
  invoice  = signal<InvoiceI | undefined>(undefined);

}
