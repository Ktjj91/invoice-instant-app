import {Routes} from '@angular/router';
import {Login} from './components/login/login';
import {jwtInterceptor} from './interceptors/jwt-interceptor';
import {authGuardGuard} from './guards/auth-guard-guard';
import {InvoiceList} from './components/invoice-list/invoice-list';
import {ClientList} from './components/client-list/client-list';
import {ClientForm} from './components/client-form/client-form';
import {ClientDetails} from './components/client-details/client-details';
import {CreateClient} from './components/create-client/create-client';
import {ClientUpdate} from './components/client-update/client-update';
import {CreateInvoice} from './components/create-invoice/create-invoice';
import {InvoiceUpdate} from './components/invoice-update/invoice-update';
import {Register} from './components/register/register';

export const routes: Routes = [
  {path: "login", component: Login},
  {path: "register", component: Register},
  {
    path: "invoices",
    canActivate: [authGuardGuard],
    children: [
      {path: '', component: InvoiceList},
      {path: "new", component: CreateInvoice},
      {path:'update/:id',component: InvoiceUpdate}
    ]
  },
  {
    path: "clients",
    canActivate: [authGuardGuard],
    children: [
      {path: '', component: ClientList},
      {path: 'new', component: CreateClient},
      {path: 'update/:id', component: ClientUpdate},
      {path: ':id', component: ClientDetails},
    ]
  },
  {path: '**', redirectTo: 'invoices'}

];
