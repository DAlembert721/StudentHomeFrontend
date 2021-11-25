import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Service} from "../models/service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

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
  // Get All Services
  getAllServices(): Observable<Service> {
    return this.http.get<Service>(`${this.basePath}/services`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Add Service To Properties
  addServiceToProperty(propertyId, serviceId): Observable<Service>{
    return this.http.post<Service>(`${this.basePath}/properties/${propertyId}/services/${serviceId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get All Services By Property
  getAllServicesByPropertyId(propertyId): Observable<Service>{
    return this.http.get<Service>(`${this.basePath}/properties/${propertyId}/services`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
