import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

type Inventory = {
  product: string,
  datemov: string,
  balance: number,
  quantityupdate: number,
  locexp: string,
  standard: string,
  quality: string
}

@Injectable({
  providedIn: 'root',
})

export class ListProductsService {
  Api = 'http://mobile.terraviva.agr.br:8014/rest/tv/vtv';

  constructor(private http: HttpClient) {}

  getListProducts(date: string, exped: string): Observable<any> {
    return this.http.get(`${this.Api}/stock/balance?origindate=${date}&exped=${exped}&process=1`);
  }

  sendInventory(): Observable<any> {
    return this.http.post(`${this.Api}/stock/inventory`, {
      product: "GY000BR000700000",
      datemov: "20240408",
      balance: 10,
      quantityupdate: 20,
      locexp: "01",
      standard: "001",
      quality: "1"
    });
  }
}
