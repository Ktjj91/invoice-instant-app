import {Component, computed, effect, inject, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ClientI} from '../../interfaces/client-i';
import {ClientService} from '../../services/clients/client-service';
import {DatePipe, JsonPipe} from '@angular/common';

@Component({
  selector: 'app-client-details',
  imports: [
    DatePipe,
    RouterLink

  ],
  templateUrl: './client-details.html',
  styleUrl: './client-details.css'
})
export class ClientDetails {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly clientService: ClientService = inject(ClientService);

  clientId = signal<number>(+this.route.snapshot.params['id']);
  private  clientRaw = signal<ClientI | null>(null);
  client = computed(() => this.clientRaw() ?? null);


  constructor() {
    effect(() => {
      const id = this.clientId();
      this.clientService.getClient(id).subscribe(c => this.clientRaw.set(c));
    });
  }


}
