import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/transactions`);
  }

  addTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${environment.apiBaseUrl}/transactions`, transaction);
  }
  getTransactionsById(transaction_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/transactions/${transaction_id}`);
  }

  // Methods for updating and deleting transactions can be added as needed.
}
