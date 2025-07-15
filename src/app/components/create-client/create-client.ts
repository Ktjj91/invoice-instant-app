import {Component, computed, effect, inject, signal} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ClientForm} from '../client-form/client-form';

@Component({
  selector: 'app-create-client',
  imports: [
    ClientForm
  ],
  templateUrl: './create-client.html',
  styleUrl: './create-client.css'
})
export class CreateClient {

  form:FormGroup = new FormGroup({
    companyName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  })




}
