import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

const AUTH_API = `${environment.HOST}/auth/`;
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = `${environment.HOST}/oauth/token`;
  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any) {
    const body = `grant_type=password&username=${encodeURIComponent(
      credentials.user
    )}&password=${encodeURIComponent(credentials.password)}`;

    return this.http.post<any>(this.url, body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
        .set(
          'Authorization',
          'Basic ' +
          btoa(
            environment.TOKEN_AUTH_USERNAME +
            ':' +
            environment.TOKEN_AUTH_PASSWORD
          )
        ),
    });
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
    }, httpOptions);
  }

  isLogged() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    return token != null;
  }

  closeSession() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
