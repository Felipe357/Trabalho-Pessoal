import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListProductsService {
  Api = 'http://mobile.terraviva.agr.br:8014/rest/tv/vtv/stock/balance';

  constructor(private http: HttpClient) {}

  getListProducts(date: string, exped: string): Observable<any> {
    return this.http.get(`${this.Api}?origindate=${date}&exped=${exped}&process=1`);
  }
}
