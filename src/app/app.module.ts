import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AddPropertyComponent } from './pages/add-property/add-property.component';
import { ContractComponent } from './pages/contract/contract.component';
import { ContractListComponent } from './pages/contract-list/contract-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LandlordProfileComponent } from './pages/landlord-profile/landlord-profile.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyDetailsComponent } from './pages/property-details/property-details.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { RentHistoryComponent } from './pages/rent-history/rent-history.component';
import { RequestFormComponent } from './pages/request-form/request-form.component';
import { RequestListComponent } from './pages/request-list/request-list.component';
import { SearchFormComponent } from './pages/search-form/search-form.component';
import { StudentProfileComponent } from './pages/student-profile/student-profile.component';
import { SubscriptionsComponent } from './pages/subscriptions/subscriptions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatRadioModule} from "@angular/material/radio";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";

@NgModule({
  declarations: [
    AppComponent,
    AddPropertyComponent,
    ContractComponent,
    ContractListComponent,
    HomeComponent,
    LandlordProfileComponent,
    LoginFormComponent,
    NavBarComponent,
    PaymentComponent,
    PropertiesComponent,
    PropertyDetailsComponent,
    RegisterFormComponent,
    RentHistoryComponent,
    RequestFormComponent,
    RequestListComponent,
    SearchFormComponent,
    StudentProfileComponent,
    SubscriptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatGridListModule,
    MatListModule,
    MatSidenavModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
