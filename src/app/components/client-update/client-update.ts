import {Component, effect, inject, signal} from '@angular/core';
import {ClientForm} from '../client-form/client-form';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../../services/clients/client-service';
import {ClientI} from '../../interfaces/client-i';

@Component({
  selector: 'app-client-update',
  imports: [
    ClientForm
  ],
  templateUrl: './client-update.html',
  styleUrl: './client-update.css'
})
export class ClientUpdate {
  private  readonly clientService: ClientService = inject(ClientService);
  route: ActivatedRoute = inject(ActivatedRoute);
  clientId = signal<number>(+this.route.snapshot.params['id']);
  client = signal<undefined | ClientI>(undefined);
  isUpdated = signal<boolean>(true);

  constructor() {
    effect(() => {
      const id = this.clientId();
      this.clientService.getClient(id).subscribe(c => {
        this.client.set(c);
      })
    });
  }


}
