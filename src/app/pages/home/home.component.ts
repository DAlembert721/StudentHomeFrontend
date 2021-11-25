import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../services/account.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  userId: string;
  type: string;
  constructor(
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.getAccountData(window.sessionStorage.getItem('auth-user'));
    this.userId = window.sessionStorage.getItem('auth-user') || "";
    if (!this.userId){
      this.type = "";
      this.navigateToLogin();
    }else {
      this.getAccountData(this.userId);
    }
  }
  ngAfterViewInit(): void{
  }

  changeStudent(): void {
    this.type = 'student';
    window.localStorage.setItem('type', this.type);
    window.localStorage.setItem('id', '251');
    window.localStorage.setItem('userId', '101');
  }
  changeLandlord(): void {
    this.type = 'landlord';
    window.localStorage.setItem('type', this.type);
    window.localStorage.setItem('id', '61');
    window.localStorage.setItem('userId', '51');
    window.localStorage.setItem('subscription', 'Premium');
  }
  navigateToLogin(): void{
    this.router.navigate([`/login`]).then(() => null);
  }
  getAccountData(userId): void{
    this.accountService.getAccountByUserId(userId, userId)
      .subscribe((response: any) => {
        const account = response;
        window.localStorage.setItem('type', account.type);
        window.sessionStorage.setItem('type', account.type);
        window.localStorage.setItem('id', account.id);
        window.localStorage.setItem('userId', account.id);
        this.type = window.localStorage.getItem('type');
      });
  }
}
