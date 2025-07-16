import {Component, inject} from '@angular/core';
import {AuthService} from '../../services/authservice/auth-service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CredentialI} from '../../interfaces/credential-i';
import {NgClass} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgClass, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  authService = inject(AuthService);
  router : Router = inject(Router);

  form: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required])
  });


  get email(){
    return this.form.get('email') as FormControl;
  }

  get password(){
    return this.form.get('password') as FormControl;
  }


  disabledButton(){
    return !this.form.invalid;
  }


  onSubmit() {
    if(this.form.invalid){
      return;
    }

    const credential : CredentialI  = {
      email:this.email.value,
      password:this.password.value
    }

    this.authService.login(credential).subscribe({
      next: ()=>{
        this.router.navigate(['invoices']);
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }



}
