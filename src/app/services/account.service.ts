import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Account} from "../models/account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  basePath = `${environment.HOST}/api`;
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };
  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof  ErrorEvent) {
      console.log('An error has ocurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }
  // Create Account
  createAccount(userId: any, account: any): Observable<Account> {
    return this.http.post<Account>(`${this.basePath}/users/${userId}/accounts`, JSON.stringify(account), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Account By Id and UserId
  getAccountByUserId(userId: any, accountId: any): Observable<Account> {
    return this.http.get<Account>(`${this.basePath}/users/${userId}/accounts/${accountId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Account
  updateAccount(accountId: any, userId: any, account: any): Observable<Account> {
    return this.http.put<Account>(`${this.basePath}/users/${userId}/accounts/${accountId}`, JSON.stringify(account), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Account
  deleteAccount(userId: any, accountId: any): Observable<any> {
    return this.http.delete(`${this.basePath}/users/${userId}/accounts/${accountId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
