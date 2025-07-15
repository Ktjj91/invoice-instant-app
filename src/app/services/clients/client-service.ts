import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {ClientI} from '../../interfaces/client-i';
import {map, Observable} from 'rxjs';
import {PaginationI} from '../../interfaces/pagination-i';
import {HelperI} from '../../interfaces/help-i';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private  http: HttpClient = inject(HttpClient);
  DOMAIN_URL = "/api/clients";


  list(page:number = 1,limit:number =  10):Observable<PaginationI<ClientI>> {
    return this.http.get<PaginationI<ClientI>>(`${this.DOMAIN_URL}?page=${page}&limit=${limit}`);
  }

  getClient(id:number):Observable<ClientI> {
    return this.http.get<HelperI<ClientI>>(`${this.DOMAIN_URL}/${id}`).pipe(
      map((response => response.data))
    );
  }

  createClient(client:Omit<ClientI, 'id' |'createdAt'>) : Observable<HttpResponse<null>>{
     return this.http.post<null>(`${this.DOMAIN_URL}`,client,{observe: 'response'});
  }


  updateClient(client:Omit<ClientI,'createdAt'>):Observable<HttpResponse<null>>{
    return this.http.patch<null>(`${this.DOMAIN_URL}/${client.id}`,client,{observe: 'response'});
  }


  deleteClient(id:number):Observable<HttpResponse<null>> {
    return  this.http.delete<null>(`${this.DOMAIN_URL}/${id}`,{observe: 'response'});
  }


}
