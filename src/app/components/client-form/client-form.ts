import {Component, effect, inject, input, InputSignal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClientI} from '../../interfaces/client-i';
import {ClientService} from '../../services/clients/client-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-client-form',
  imports: [ReactiveFormsModule],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css'
})
export class ClientForm {
  private readonly  clientService:ClientService = inject(ClientService);
  private readonly router:Router = inject(Router);
  client  = input<ClientI>();
  isUpdated = input.required<boolean>();

  form:FormGroup = new FormGroup({
    companyName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', [Validators.required]),
    siret: new FormControl('', Validators.required),
  })

  constructor() {
    effect(() => {
      const c = this.client();

      if(c && this.isUpdated()){
        this.form.patchValue({
          companyName:c.companyName,
          firstName:c.firstName,
          lastName:c.lastName,
          email:c.email,
          phone:c.phone,
          address:c.address,
          siret:c.siret,
        })
      }
    });
  }

  get companyName() {
    return this.form.get('companyName') as FormControl;
  }

  get firstName() {
    return this.form.get('firstName') as FormControl;
  }

  get lastName() {
    return this.form.get('lastName') as FormControl;
  }
  get email() {
    return this.form.get('email') as FormControl;
  }
  get phone() {
    return this.form.get('phone') as FormControl;
  }

  get address() {
    return this.form.get('address') as FormControl;
  }

  get siret() {
    return this.form.get('siret') as FormControl;
  }



    onSubmit(){
    if(this.form.invalid){
      return;
    }

    if(this.isUpdated()){
      const c : Omit<ClientI , 'createdAt'> = {
        id:Number(this.client()?.id),
        companyName : this.companyName.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email:this.email.value,
        phone:this.phone.value,
        address:this.address.value,
        siret:this.siret.value
      }
      this.clientService.updateClient(c).subscribe({
        next: ()=>{this.router.navigate(['/clients']);},
        error: err => {console.log(err)}
      })

    } else {
      const c : Omit<ClientI, 'id' | 'createdAt'> = {
        companyName : this.companyName.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email:this.email.value,
        phone:this.phone.value,
        address:this.address.value,
        siret:this.siret.value
      }
      this.clientService.createClient(c).subscribe({
        next: ()=>{ this.router.navigate(['/clients']);},
        error: (err) => {console.log(err)}
      })
    }

    }

}
