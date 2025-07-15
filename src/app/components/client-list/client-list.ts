import { Component, computed, effect, inject, signal} from '@angular/core';
import {ClientService} from '../../services/clients/client-service';
import {ClientI} from '../../interfaces/client-i';
import {PaginationI} from '../../interfaces/pagination-i';
import {NgClass} from '@angular/common';
import {RouterLink} from '@angular/router';
import {ModalDelete} from '../modal-delete/modal-delete';

@Component({
  selector: 'app-client-list',
  imports: [
    NgClass,
    RouterLink,
    ModalDelete
  ],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css'
})
export class ClientList  {
  clientService =  inject(ClientService);

  private page = signal(1);
  private  limit  = signal(10);

  private pagination = signal<PaginationI<ClientI> | null>(null);

  clients = computed(() => this.pagination()?.data ?? []);
  currentPage = computed(() => this.pagination()?.meta.page ?? 1);
  perPage = computed(() => this.pagination()?.meta.limit ?? 10 );
  totalItems = computed(() => this.pagination()?.meta.totalItems ?? 0);
  totalPages = computed(() => this.pagination()?.meta.totalPages ?? 0);

  constructor() {
    effect(() => {
      const page  = this.page();
      const limit = this.limit();
        this.loadClients(page, limit);
    });
  }


  loadClients(page:number,limit:number){
    this.clientService
      .list(page, limit)
      .subscribe(p => this.pagination.set(p));
  }


  onPageChange(newPage: number) {
    this.page.set(newPage)
  }

  deleteClient(clientId:number) {
    this.clientService.deleteClient(clientId).subscribe({
      next: ()=> {this.loadClients(this.page(),this.limit())},
      error:(err) => console.error(err)
    })
  }


}
