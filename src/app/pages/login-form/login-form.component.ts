import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";
import {TokenService} from "../../services/token.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private formBuilder: FormBuilder,
              private userDataService: UserService,
              private authService: AuthService,
              private tokenStorageService: TokenService,
              private router: Router,
              private accountService: AccountService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
    }
  }
  reloadPage(): void {
    window.location.reload();
  }
  onSubmit(): void {
    if (window.localStorage.getItem('type') !== null){
      this.navigateToHome();
    }
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.access_token);
        // this.tokenStorageService.saveUser(data.id);
        sessionStorage.setItem(environment.TOKEN_NAME, data.access_token);
        this.tokenStorageService.getAccountData(data.id);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        return this.router.navigate(['/']).then(() => {
          // this.getAccountData(data.id);
          console.log(this.router.url);
          window.location.reload();
        });
      },
      error => {
        console.log(error.error.errorMessage);
        this.errorMessage = error.error.errorMessage;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    );
  }
  navigateToRegister(): void {
    this.router.navigate([`/register`]).then(() => null);
  }
  getAccountData(userId): void{
    this.accountService.getAccountByUserId(userId, userId)
      .subscribe((response: any) => {
        const account = response;
        sessionStorage.setItem('type', account.type);
        sessionStorage.setItem('id', account.id);
        sessionStorage.setItem('userId', account.id);
      });
  }
  navigateToHome(): void{
    this.router.navigate([`/home`]).then(() => null);
  }
}
