import {Component, effect, inject, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {InvoiceI} from '../../interfaces/invoice-i';
import {InvoiceService} from '../../services/invoices/invoice-service';
import {InvoiceForm} from '../invoice-form/invoice-form';

@Component({
  selector: 'app-invoice-update',
  imports: [
    InvoiceForm
  ],
  templateUrl: './invoice-update.html',
  styleUrl: './invoice-update.css'
})
export class InvoiceUpdate {
  route:ActivatedRoute = inject(ActivatedRoute);
  invoiceId = signal<number>(+this.route.snapshot.params['id']);
  invoice = signal<InvoiceI | undefined>(undefined);
  invoiceService:InvoiceService = inject(InvoiceService);
  isUpdate = signal<boolean>(true);
  constructor() {
    effect(() => {
      const id = this.invoiceId();
      this.invoiceService.getInvoice(id).subscribe(i => {
        this.invoice.set(i);
      })
    });
  }

}
