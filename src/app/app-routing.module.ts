import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginFormComponent} from "./pages/login-form/login-form.component";
import {RegisterFormComponent} from "./pages/register-form/register-form.component";
import {HomeComponent} from "./pages/home/home.component";
import {LandlordProfileComponent} from "./pages/landlord-profile/landlord-profile.component";
import {AddPropertyComponent} from "./pages/add-property/add-property.component";
import {PropertyDetailsComponent} from "./pages/property-details/property-details.component";
import {StudentProfileComponent} from "./pages/student-profile/student-profile.component";
import {RequestListComponent} from "./pages/request-list/request-list.component";
import {ContractListComponent} from "./pages/contract-list/contract-list.component";
import {RequestFormComponent} from "./pages/request-form/request-form.component";
import {ContractComponent} from "./pages/contract/contract.component";
import {SearchFormComponent,} from "./pages/search-form/search-form.component";
import {SubscriptionsComponent} from "./pages/subscriptions/subscriptions.component";
import {RentHistoryComponent} from "./pages/rent-history/rent-history.component";
import {PaymentComponent} from "./pages/payment/payment.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'login', component: LoginFormComponent},
  { path: 'register', component: RegisterFormComponent},
  { path: 'home', component: HomeComponent},
  { path: 'landlords/:id', component: LandlordProfileComponent },
  { path: 'users/:userId/landlords/:landlordId', component: LandlordProfileComponent},
  // { path: 'landlords/:landlordId/properties', component: PropertiesComponent},
  { path: 'landlords/:landlordId/properties/add', component: AddPropertyComponent},
  { path: 'landlords/:id/properties/:propertyId', component: PropertyDetailsComponent},
  { path: 'landlords/:landlordId/properties/:propertyId/edit', component: AddPropertyComponent},
  { path: 'students/:id/properties/:propertyId', component: PropertyDetailsComponent},
  { path: 'students/:id', component: StudentProfileComponent},
  { path: 'users/:userId/students/:studentId', component: StudentProfileComponent},
  { path: 'students/:id/requests', component: RequestListComponent},
  { path: 'landlords/:id/requests', component: RequestListComponent},
  { path: 'students/:id/contracts', component: ContractListComponent},
  { path: 'landlords/:id/contracts', component: ContractListComponent},
  { path: 'students/:studentId/requests/:propertyId', component: RequestFormComponent},
  { path: 'landlords/:landlordId/requests/:requestId', component: ContractComponent},
  { path: 'students/:id/search_property', component: SearchFormComponent},
  { path: 'landlords/:id/subscription', component: SubscriptionsComponent},
  { path: 'contracts/:contractId', component: ContractComponent},
  { path: 'contracts/:contractId/payment_history', component: RentHistoryComponent},
  { path: 'contracts/:contractId/payment_history/:paymentId', component: PaymentComponent},
  { path: 'contracts/:contractId/payments/add', component: PaymentComponent},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
