import { Injectable } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { Deal } from '../entities/deal';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private apiUrl = 'http://localhost:8075/CRM/deals/getAllDeals';
  constructor( private http :HttpClient) { }

  getDeals(): Observable<Deal[]> {
    return this.http.get<Deal[]>(this.apiUrl);
  }
}
