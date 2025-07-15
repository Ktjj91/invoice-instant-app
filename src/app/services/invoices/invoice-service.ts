import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {PaginationI} from '../../interfaces/pagination-i';
import {InvoiceI} from '../../interfaces/invoice-i';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private http:HttpClient = inject(HttpClient);
  DOMAIN_URL = "/api/invoices";

  list(page:number = 1,limit:number =  10):Observable<PaginationI<InvoiceI>> {
    return this.http.get<PaginationI<InvoiceI>>(`${this.DOMAIN_URL}?page=${page}&limit=${limit}`);
  }


  getInvoicePdf(id:number):Observable<HttpResponse<Blob>>{
    return this.http.get(`${this.DOMAIN_URL}/${id}/pdf`,{observe: 'response',responseType:'blob'});

  }

  getInvoice(id:number):Observable<InvoiceI>{
    return this.http.get<{data:InvoiceI}>(`${this.DOMAIN_URL}/${id}`)
      .pipe(map(response => response.data));
  }

  createInvoice(invoice:Omit<InvoiceI, 'id' | 'number' | 'createdAt' | 'total'>):Observable<HttpResponse<null>>{
    return this.http.post<null>(`${this.DOMAIN_URL}`, invoice,{observe: 'response'});
  }

  updateInvoice(id:number,invoice:Omit<'number' |'createdAt' | 'total', any>):Observable<HttpResponse<null>>{
    return this.http.patch<null>(`${this.DOMAIN_URL}/${id}`,invoice,{observe: 'response'});
  }

  deleteInvoice(id:number):Observable<HttpResponse<null>>{
    return this.http.delete<null>(`${this.DOMAIN_URL}/${id}`,{observe: 'response'});
  }






}
