import {AfterViewInit, Component, ElementRef, input, output, ViewChild} from '@angular/core';
import {Dropdown} from 'flowbite';

@Component({
  selector: 'app-menu-dropdown',
  imports: [
  ],
  templateUrl: './menu-dropdown.html',
  styleUrl: './menu-dropdown.css'
})
export class MenuDropdown implements AfterViewInit {
  invoiceIdRaw = input.required<number>();
  getInvoicePdf = output<number>();
  downloadPdf = output<number>();
  navigateToUpdateInvoice = output<number>();
  deleteIdInvoice = output<number>();

  private dropDown!:Dropdown;
  @ViewChild('menuElem',{static:true}) menuElem!: ElementRef<HTMLElement>;
  @ViewChild('btnElem',{static:true}) btnElem!: ElementRef<HTMLButtonElement>;

  ngAfterViewInit(): void {
    this.dropDown = new Dropdown(this.menuElem.nativeElement,this.btnElem.nativeElement,{
      placement:'bottom',
      triggerType:'click',
    });
  }

    onOpenPdf(): void {
    this.getInvoicePdf.emit(this.invoiceIdRaw());
    }
    onDownloadPdf(): void {
    this.downloadPdf.emit(this.invoiceIdRaw());
    }

    onNavigateToUpdateInvoicePdf(): void {
    this.navigateToUpdateInvoice.emit(this.invoiceIdRaw());
    }


    onDeleteInvoice(): void {
    this.deleteIdInvoice.emit(this.invoiceIdRaw());
    }



}
