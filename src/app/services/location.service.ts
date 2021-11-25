import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {Region} from "../models/region";
import {Province} from "../models/province";
import {District} from "../models/district";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  basePath = `${environment.HOST}/api/location`;

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
  // Get Regions
  getRegionById(): Observable<Region> {
    return this.http.get<Region>(`${this.basePath}/regions`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Provinces By RegionId
  getProvincesByRegionId(regionId): Observable<Province> {
    return this.http.get<Province>(`${this.basePath}/regions/${regionId}/provinces`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Districts By ProvinceId
  getDistrictsByProvinceId(provinceId): Observable<District> {
    return this.http.get<District>(`${this.basePath}/provinces/${provinceId}/districts`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
