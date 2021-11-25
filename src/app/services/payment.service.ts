import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Payment} from "../models/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  basePath = `${environment.HOST}/api`;

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error has ocurred: ', error.error.message);
    } else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  // Create Payment
  createPayment(contractId, payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.basePath}/contracts/${contractId}/payments`, JSON.stringify(payment), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Payment By Id
  getPaymentById(paymentId): Observable<Payment> {
    return this.http.get<Payment>(`${this.basePath}/payments/${paymentId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Payments by Contract Id
  getPaymentsByContractId(contractId): Observable<Payment> {
    return this.http.get<Payment>(`${this.basePath}/contracts/${contractId}/payments`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Payment
  updatePayment(paymentId, data): Observable<Payment> {
    return this.http.put<Payment>(`${this.basePath}/payments/${paymentId}`,
      JSON.stringify(data), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Property
  deleteProperty(paymentId): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/payments/${paymentId}`, this.httpOptions);
  }
}
