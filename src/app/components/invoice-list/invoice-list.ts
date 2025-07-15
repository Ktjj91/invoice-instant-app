import {AfterViewInit, Component, computed, effect, ElementRef, inject, signal, ViewChild} from '@angular/core';
import {InvoiceService} from '../../services/invoices/invoice-service';
import {PaginationI} from '../../interfaces/pagination-i';
import {InvoiceI} from '../../interfaces/invoice-i';
import {CurrencyPipe, DatePipe, NgClass, TitleCasePipe} from '@angular/common';
import {Status} from '../../enum/StatusEnum';
import {MenuDropdown} from '../menu-dropdown/menu-dropdown';
import {Router} from '@angular/router';
import {Modal} from 'flowbite';

@Component({
  selector: 'app-invoice-list',
  imports: [
    NgClass,
    DatePipe,
    CurrencyPipe,
    TitleCasePipe,
    MenuDropdown,
  ],
  templateUrl: './invoice-list.html',
  styleUrl: './invoice-list.css'
})
export class InvoiceList implements AfterViewInit{
  invoiceService = inject(InvoiceService);
  router:Router = inject(Router);

  page = signal(1);
  limit = signal(10);

  private pagination = signal<PaginationI<InvoiceI> | null>(null);
  invoices = computed(() => this.pagination()?.data ?? []);

  currentPage = computed(() => this.pagination()?.meta.page ?? 1);
  perPage = computed(() => this.pagination()?.meta.limit ?? 10 );
  totalItems = computed(() => this.pagination()?.meta.totalItems ?? 0);
  totalPages = computed(() => this.pagination()?.meta.totalPages ?? 0);

  @ViewChild('deleteModal', {static: true}) deleteModal!: ElementRef<HTMLElement>;
  deleteModalInstance!: Modal;
  pendingDeleteId = signal<number | null>(null);

  badgeClasses: Record<Status, string> = {
    [Status.Draft]:   'bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-gray-700 dark:text-gray-300',
    [Status.Sent]:    'bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-purple-900 dark:text-purple-300',
    [Status.Paid]:    'bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300',
    [Status.Overdue]: 'bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-sm dark:bg-red-900 dark:text-red-300',
  };

  ngAfterViewInit(): void {
    this.deleteModalInstance = new Modal(this.deleteModal.nativeElement);
  }

  openDeleteModal(id:number){
    this.pendingDeleteId.set(id);
    this.deleteModalInstance.show();
  }

  constructor() {
    effect(() => {
      const page = this.page();
      const limit = this.limit();
      this.loadInvoices(page,limit);
    });
  }

  loadInvoices(page:number,limit:number) {
      this.invoiceService.list(page,limit).subscribe(p => {
        this.pagination.set(p);
      });
  }

  onPageChange(page:number) {
    this.page.set(page);
  }

  getInvoice(id:number){
    return this.invoiceService.getInvoicePdf(id).subscribe(response => {
      const blob = response.body!;
      const url = URL.createObjectURL(blob);
      window.open(url);
      URL.revokeObjectURL(url);
    })
  }

  downloadPdf(id:number){
    this.invoiceService.getInvoicePdf(id).subscribe(response => {
      const blob = response.body!;
      const link = document.createElement('a');
      const url =  URL.createObjectURL(blob);
      link.href = url;
      const cd = response.headers.get('Content-Disposition') || '';
      const filenameMatch = /filename="(.+)"/.exec(cd);
      link.download = filenameMatch ? filenameMatch[1] : `facture-${id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    })
  }

  navigateToUpdateInvoice(id:number){
    this.router.navigate(['/invoices/update',id])
  }

  confirmDelete(){
    if(this.pendingDeleteId() === null) return;
    const id = this.pendingDeleteId() as number;

    this.invoiceService.deleteInvoice(id).subscribe({
       next: ()=> {
         this.loadInvoices(this.page(),this.limit());
         this.deleteModalInstance.hide();
       },
       error:(err)=> console.error(err)
     })
  }

}
