import {computed, inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokenI} from '../../interfaces/token-i';
import {CredentialI} from '../../interfaces/credential-i';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient);
  private  token = signal<string | null>(localStorage.getItem('token'));
  readonly $token = this.token.asReadonly();
  DOMAIN_URL = "/api"

  readonly isLoggedIn =  computed(() => {
    return !!this.token();
  });

  constructor() {
    const saved:  string | null = localStorage.getItem('token');
    if (saved) this.token.set(saved);
  }

  login(credentials:CredentialI){
    return this.httpClient.post<TokenI>(`${this.DOMAIN_URL}/login_check`, credentials).pipe(
       tap((response) => this.setToken(response.token))
    );
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.token.set(null);
  }

  getToken() : string | null  {
    return this.$token();
  }

}
