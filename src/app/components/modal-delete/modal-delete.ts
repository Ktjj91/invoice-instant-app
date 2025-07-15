import {AfterViewInit, Component, computed, ElementRef, input, output, signal, ViewChild} from '@angular/core';
import {Modal} from 'flowbite';

@Component({
  selector: 'app-modal-delete',
  imports: [],
  templateUrl: './modal-delete.html',
  styleUrl: './modal-delete.css'
})
export class ModalDelete implements AfterViewInit {
  clientIdRaw = input.required<number>();
  clientId = computed(() => `popup-modal-${this.clientIdRaw()}`);



  private modal!:Modal;

  @ViewChild('modalElem',{static: true}) modalElem!: ElementRef<HTMLElement>;
  onDeleteClient = output<number>();

  ngAfterViewInit(): void {
    this.modal = new Modal(this.modalElem.nativeElement, {});
  }


  open(): void {
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }

  confirmDelete(): void {
    this.onDeleteClient.emit(this.clientIdRaw());
    this.modal.hide();
  }






}
