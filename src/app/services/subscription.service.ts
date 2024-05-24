import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { subscription } from '../entities/subscription';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  private apiUrl = 'http://localhost:8075/CRM/subscriptions'; 

  constructor(private http: HttpClient) { }

  createSubscription(dealId: number, userId: number, subscription: subscription): Observable<subscription> {
    const url = `${this.apiUrl}?dealId=${dealId}&userId=${userId}`;
    return this.http.post<subscription>(url, subscription).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  getSubscriptionById(id: number): Observable<subscription> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<subscription>(url);
  }

  deleteSubscription(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  getAllSubscriptions(): Observable<subscription[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<subscription[]>(url);
  }
}