import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductInt} from "../interfaces/productInt";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private httpsOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
    withCredentials: true
  }

  public newProduct (product: FormData): Observable<ProductInt>{
    product.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
    return this.http.post<ProductInt>("http://localhost:8000/api/product/newProduct", product, {withCredentials: true});
  }

  public getAllProduct(id: string): Observable<ProductInt[]>{
    return this.http.get<ProductInt[]>("http://localhost:8000/api/product/getProducts/"+ id, this.httpsOptions)
  }

  public deleteProduct(productId: string, userId: string): Observable<{message: string}>{
    return this.http.delete<{message: string}>("http://localhost:8000/api/product/delete/" + productId + "/" + userId, this.httpsOptions);
  }

}
