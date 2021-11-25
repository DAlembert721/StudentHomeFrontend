import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Request} from '../models/request';
import {RequestState} from "../models/request-state.enum";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

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
  // Create Request
  createRequest(studentId, propertyId, request): Observable<Request> {
    return this.http.post<Request>(`${this.basePath}/students/${studentId}/properties/${propertyId}/requests`
      , JSON.stringify(request), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Request By StudentId
  getRequestByStudentId(studentId): Observable<Request> {
    return this.http.get<Request>(`${this.basePath}/students/${studentId}/requests`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Request By PropertyId
  getRequestByPropertyId(propertyId): Observable<Request> {
    return this.http.get<Request>(`${this.basePath}/properties/${propertyId}/requests`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Request By Id
  getRequestById(requestId): Observable<Request> {
    return this.http.get<Request>(`${this.basePath}/properties/${requestId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Request
  updateRequest(requestId, request): Observable<Request> {
    return this.http.put<Request>(`${this.basePath}/requests/${requestId}`
      , JSON.stringify(request), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Request
  deleteRequest(requestId): Observable<any> {
    return this.http.delete(`${this.basePath}/requests/${requestId}`
      , this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Request State
  updateRequestState(requestId, state: RequestState): Observable<Request> {
    let val;
    switch (state) {
      case RequestState.ACCEPTED:
        val = 'ACCEPTED';
        break;
      case RequestState.CANCELED:
        val = 'CANCELED';
        break;
      case RequestState.DENIED:
        val = 'DENIED';
        break;
      case RequestState.UNRESOLVED:
        val = 'UNRESOLVED';
        break;

    }
    return this.http.put<Request>(`${this.basePath}/requests/${requestId}/state=${val}`
      , {}, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
