import {
  Component,
  computed,
  effect,
  inject, input,
  signal,
} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Status} from '../../enum/StatusEnum';
import {TitleCasePipe} from '@angular/common';
import {ClientService} from '../../services/clients/client-service';
import {ClientI} from '../../interfaces/client-i';
import {PaginationI} from '../../interfaces/pagination-i';
import {InvoiceI} from '../../interfaces/invoice-i';
import {InvoiceService} from '../../services/invoices/invoice-service';
import {Router} from '@angular/router';
import {InvoiceItemsI} from '../../interfaces/invoice-items-i';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-invoice-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './invoice-form.html',
  styleUrl: './invoice-form.css'
})
export class InvoiceForm  {
  private fb = inject(FormBuilder);
  status = Object.values(Status) as Status[];
  private invoiceService:InvoiceService = inject(InvoiceService);
  private clientService:ClientService = inject(ClientService);
  private  router:Router = inject(Router);

  isUpdate = input<boolean>();
  invoice = input<InvoiceI>();

  private pagination = signal<PaginationI<ClientI> | null>(null);
  clients = computed(() => this.pagination()?.data ?? []);

  constructor() {
    effect(() => {
      this.clientService.list(1,100).subscribe(p => {
        this.pagination.set(p);
      })
    });
    effect(() => {
      const i = this.invoice();
      if(i != undefined && this.isUpdate() && Array.isArray(i.invoiceItems)){
        const {client,status,note} = i;
        function formatDate(input:string | Date):string{
          if(input instanceof Date){
            return  input.toISOString().slice(0,10);
          }
          return input.slice(0,10);
        }

        this.lines.clear()
        i.invoiceItems.forEach((item) => {
          this.lines.push(this.createLine(item));
        })
        const clientUri = `/api/clients/${i.client.id}`
        this.formInvoice.patchValue({
         client :clientUri,
          status,
          invoiceDate : formatDate(i.invoiceDate),
          dueDate : formatDate(i.dueDate),
          note,
        })
        console.log('formControl client =', this.formInvoice.get('client')!.value);

      }

    })
  }

  formInvoice:FormGroup = this.fb.group({
    client:['', Validators.required],
    status:[Status.Draft, Validators.required],
    invoiceDate:['', Validators.required],
    dueDate:['', Validators.required],
    note:[''],
    invoiceItems:this.fb.array([
      this.createLine()
    ],Validators.required),
  })

  get lines():FormArray {
    return  this.formInvoice.get('invoiceItems') as FormArray;
  }

  private createLine(item?:InvoiceItemsI):FormGroup {
    return this.fb.group({
      description: [item?.description ?? '', Validators.required],
      quantity:    [item?.quantity    ?? 1,  [Validators.required, Validators.min(1)]],
      unitPrice:   [item?.unitPrice   ?? 0,  Validators.required],
      taxRate:     [item?.taxRate     ?? 0,  Validators.required],
    })
  }

  addLine() {
    this.lines.push(this.createLine());
  }

  removeLine(i: number) {
    this.lines.removeAt(i);
  }



  private buildPayload(){
    const { client, invoiceDate, dueDate, status, note, invoiceItems } = this.formInvoice.value;
    return { client, invoiceDate, dueDate, status, note, invoiceItems };
  }

  private create$(invoiceData: Omit<InvoiceI, 'id'|'number'|'createdAt'|'total'>){
   return  this.invoiceService.createInvoice(invoiceData);
  }

  private update$(id: number, invoiceData: Omit<InvoiceI, 'id' | 'number'|'createdAt'|'total'>) {
   return  this.invoiceService.updateInvoice(id,invoiceData);
  }


  ButtonSubmit(){

    return this.isUpdate() ?  "Modifier" : "Créer";
  }
  onSubmit(){
    if(this.formInvoice.invalid) return;
    const payload = this.buildPayload();

    const action$ = this.isUpdate()
      ? this.update$(this.invoice()!.id, payload)
      : this.create$(payload);

    action$.subscribe({
      next: () => this.router.navigate(['/invoices']),
      error: e => console.error(e),
    });
  }



}
