import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterService} from '../../services/register/register';
import {CredentialI} from '../../interfaces/credential-i';
import {AuthService} from '../../services/authservice/auth-service';
import {Router, RouterLink} from '@angular/router';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgClass,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  fb:FormBuilder = inject(FormBuilder);
  registerService  = inject(RegisterService);
  authService:AuthService = inject(AuthService);
  router:Router = inject(Router);


  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  })

  buildPayload() {
    const {email, password} = this.form.value;
    return {email, password};
  }

  disabledButton(){
    return !this.form.invalid;
  }



  onSubmit(){
    if(this.form.invalid) return;
    const payload = this.buildPayload() as CredentialI;
    this.registerService.register(payload).subscribe({
      next: (token)=>{
        this.authService.setToken(token.token);
        this.router.navigate(['/invoices']);
      },
      error:(error)=>{console.log(error)}
      }
    )
  }








}
