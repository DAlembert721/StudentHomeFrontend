import { Injectable } from '@angular/core';
import {AccountService} from "./account.service";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private accountService: AccountService) { }
  public signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY) || "";
  }
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getAccountData(userId): void{
    this.accountService.getAccountByUserId(userId, userId)
      .subscribe((response: any) => {
        const account = response;
        window.sessionStorage.removeItem('type');
        window.sessionStorage.setItem('type', account.type);
        window.localStorage.setItem('type', account.type);
        window.localStorage.setItem('id', account.id);
        window.localStorage.setItem('userId', account.id);
      });
  }
  public getUser = () => JSON.parse(window.sessionStorage.getItem(USER_KEY) || "");
}
