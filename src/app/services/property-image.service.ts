import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {PropertyImage} from "../models/property-image";

@Injectable({
  providedIn: 'root'
})
export class PropertyImageService {

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

  // Get All Property Images By Properties
  getAllPropertyImagesByPropertyId(propertyId): Observable<PropertyImage> {
    return this.http.get<PropertyImage>(`${this.basePath}/properties/${propertyId}/property-images`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Create A Property Image
  addPropertyImageToProperty(propertyId, data): Observable<PropertyImage> {
    return this.http.post<PropertyImage>(`${this.basePath}/properties/${propertyId}/property-images`,
      JSON.stringify(data), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update PropertyImage
  updatePropertyImage(id, item): Observable<PropertyImage> {
    return this.http.put<PropertyImage>(`${this.basePath}/property-images/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Delete PropertyImage
  deletePropertyImage(id): Observable<any> {
    return this.http.delete<any>(`${this.basePath}/property-images/${id}`, this.httpOptions);
  }
}
