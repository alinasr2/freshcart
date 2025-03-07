import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient:HttpClient) { }

  getAllProducts(page:number):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/v1/products/?page=${page}`);
  }
  getSpecificProducts(id:string):Observable<any>
  {
    return this.httpClient.get(`${environment.baseUrl}api/v1/products/${id}`);
  }
}
