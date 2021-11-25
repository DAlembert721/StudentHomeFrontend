import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Contract} from "../models/contract";
import {ContractState} from "../models/contract-state.enum";

@Injectable({
  providedIn: 'root'
})
export class ContractService {

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
  // Create Contract
  createContract(studentId, propertyId, contract): Observable<Contract> {
    return this.http.post<Contract>(`${this.basePath}/students/${studentId}/properties/${propertyId}/contracts`
      , JSON.stringify(contract), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Contract By Id
  getContractsById(contractId): Observable<Contract> {
    return this.http.get<Contract>(`${this.basePath}/contracts/${contractId}`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Contract By StudentId
  getContractsByStudentId(studentId): Observable<Contract> {
    return this.http.get<Contract>(`${this.basePath}/students/${studentId}/contracts`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Contract By PropertyId
  getContractsByPropertyId(propertyId): Observable<Contract> {
    return this.http.get<Contract>(`${this.basePath}/properties/${propertyId}/contracts`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Contract
  updateContract(contractId, contract): Observable<Contract> {
    return this.http.put<Contract>(`${this.basePath}/contracts/${contractId}`
      , JSON.stringify(contract), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Request
  deleteContract(contractId): Observable<any> {
    return this.http.delete(`${this.basePath}/contracts/${contractId}`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Contract State
  updateContractState(contractId, state: ContractState): Observable<Contract>{
    let val;
    switch (state) {
      case ContractState.ACTIVE:
        val = 'ACTIVE';
        break;
      case ContractState.CANCELED:
        val = 'CANCELED';
        break;
      case ContractState.CONCLUDED:
        val = 'CONCLUDED';
        break;
      case ContractState.UNRESOLVED:
        val = 'UNRESOLVED';
        break;

    }
    return this.http.put<Contract>(`${this.basePath}/contracts/${contractId}/state=${val}`
      , {}, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
