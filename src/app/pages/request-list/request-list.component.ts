import { Component, OnInit } from '@angular/core';
import {RequestService} from "../../services/request.service";
import {PropertyService} from "../../services/property.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RequestState} from "../../models/request-state.enum";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  requests: Request[];
  id: number;
  type: any;
  landLordId: number;
  constructor(private requestService: RequestService,
              private propertyService: PropertyService,
              private router: Router,
              private route: ActivatedRoute) {
    console.log('here');

  }

  ngOnInit(): void {
    this.requests = [];
    this.initialize();
  }
  initialize(): void {
    this.id = Number(this.route.params.subscribe(params => {
      const id = params.id;
      this.type = localStorage.getItem('type');
      if (this.type === 'student') {
        this.retrieveRequestByStudentId(id);
      }
      else {
        this.retrievePropertiesByLandLordId(id);
        this.landLordId = id;
      }
      return id;
    }));
  }
  retrieveRequestByStudentId(studentId): void {
    this.requestService.getRequestByStudentId(studentId)
      .subscribe((response: any) => {
        this.requests = response.content;
        // console.log(response);
      });
  }
  retrieveRequestByPropertyId(propertyId): void {
    this.requestService.getRequestByPropertyId(propertyId)
      .subscribe((response: any) => {
        for (const item of response.content) {
          this.requests.push(item);
        }
        console.log(this.requests);
      });
  }
  retrievePropertiesByLandLordId(landlordId): void {
    this.propertyService.getPropertiesByLandlordId(landlordId)
      .subscribe((response: any) => {
        const properties = response.content;
        for (const property of properties) {
          this.retrieveRequestByPropertyId(property.id);
        }
      });
  }
  acceptRequest(requestId): void {
    /*this.requestService.updateRequest(requestId, request)
      .subscribe(() => {
        if (this.type !== 'student') {
          this.retrieveRequestByStudentId(this.id);
        }
      });*/
    this.router.navigate([`/landlords/${this.landLordId}/requests/${requestId}`]).then(() => null);
  }
  denyRequest(requestId): void {
    this.requestService.updateRequest(requestId, RequestState.DENIED)
      .subscribe(() => {
        window.location.reload();
      });
  }
  cancelRequest(requestId): void {
    this.requestService.updateRequest(requestId, RequestState.CANCELED)
      .subscribe(() => {
        window.location.reload();
      });
  }

}
