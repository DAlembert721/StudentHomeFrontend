import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Property} from "../models/property";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

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

  // Create Property
  createProperty(landlordId, property): Observable<Property> {
    return this.http.post<Property>(`${this.basePath}/landlords/${landlordId}/properties`, JSON.stringify(property), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get all Properties
  getProperty(): Observable<Property> {
    return this.http.get<Property>(`${this.basePath}/properties`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Property By Id
  getPropertyById(propertyId): Observable<Property> {
    return this.http.get<Property>(`${this.basePath}/properties/${propertyId}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Properties by LandlordId
  getPropertiesByLandlordId(landlordId): Observable<Property> {
    return this.http.get<Property>(`${this.basePath}/landlords/${landlordId}/properties`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Property
  updateProperty(landlordId, propertyId, item): Observable<Property> {
    return this.http.put<Property>(`${this.basePath}/landlords/${landlordId}/properties/${propertyId}`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete Property
  deleteProperty(id): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/${id}`, this.httpOptions);
  }

  // Get All Properties By Service Id
  getAllPropertiesByServiceId(serviceId): Observable<Property> {
    return this.http.get<Property>(`${this.basePath}/services/${serviceId}/properties`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get All Active Properties
  getAllActiveProperties(): Observable<Property> {
    return this.http.get<Property>(`${this.basePath}/properties/active=${true}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
