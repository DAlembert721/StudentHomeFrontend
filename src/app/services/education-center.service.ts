import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {EducationCenter} from "../models/education-center";

@Injectable({
  providedIn: 'root'
})
export class EducationCenterService {

  basePath = `${environment.HOST}/api/education`;

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

  // Get Education Centers
  getEducationCenters(): Observable<EducationCenter> {
    return this.http.get<EducationCenter>(`${this.basePath}/education-centers`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
