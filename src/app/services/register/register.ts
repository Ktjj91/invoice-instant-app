import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CredentialI} from '../../interfaces/credential-i';
import {Observable} from 'rxjs';
import {TokenI} from '../../interfaces/token-i';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  http:HttpClient = inject(HttpClient);
  private  DOMAIN_URL ="/api/register";


  register(credentials:CredentialI):Observable<TokenI>{
    return  this.http.post<TokenI>(`${this.DOMAIN_URL}`, credentials)
  }





}
