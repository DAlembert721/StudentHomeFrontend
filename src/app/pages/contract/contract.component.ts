import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Student} from "../../models/student";
import {Property} from "../../models/property";
import {Contract} from "../../models/contract";
import {RequestService} from "../../services/request.service";
import {StudentService} from "../../services/student.service";
import {PropertyService} from "../../services/property.service";
import {ContractService} from "../../services/contract.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  @ViewChild('contractForm', {static: false})
  contractForm: NgForm;
  requestId: number;
  landlordId: number;
  studentId: number;
  propertyId: number;
  studentImage = 'https://source.unsplash.com/900x900/?face,young';
  requestData = {
    content: 'Some content here',
    createdAt: new Date(),
    firstNameLandlord: 'Landlord',
    firstNameStudent: 'Student',
    id: 31,
    lastNameLandlord: 'LastNameLL',
    lastNameStudent: 'LastNameS',
    state: false
  };
  studentData: Student;
  propertyData: Property;
  contractData: Contract;
  contractId: number;
  isView = false;

  constructor(private requestDataService: RequestService,
              private studentDataService: StudentService,
              private propertyDataService: PropertyService,
              private contractDataService: ContractService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.landlordId = Number(this.route.snapshot.paramMap.get('landlordId'));
    this.requestId = Number(this.route.snapshot.paramMap.get('requestId'));
    this.studentId = 251;
    this.propertyId = 11;
    this.retrievePropertyById(this.propertyId);
    this.retrieveStudentById(this.studentId);
    this.contractData.firstNameStudent = this.requestData.firstNameStudent;
    this.contractData.lastNameStudent = this.requestData.lastNameStudent;
    this.retrieveRequestById(this.requestId);
    this.contractId = Number(this.route.snapshot.paramMap.get('contractId'));
    console.log(this.contractId);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      if ( this.contractId === 0) {
        this.isView = false; }
      else {
        this.isView = true;
      }});
    console.log(this.isView);
  }

  retrieveStudentById(id): void {
    this.studentDataService.getStudentByStudentId(id)
      .subscribe((response: Student) => {
        this.studentData = {} as Student;
        this.studentData = _.cloneDeep(response);
        console.log(response);
        console.log(this.studentData);
      });
  }
  retrievePropertyById(id): void {
    this.propertyDataService.getPropertyById(id)
      .subscribe((response: Property) => {
        this.propertyData = {} as Property;
        this.propertyData = _.cloneDeep(response);
        console.log(response);
        console.log(this.propertyData);
      });
  }
  retrieveRequestById(id): void {
    /*this.requestDataService.getRequestById(id)
      .subscribe((response: Request) => {
        this.requestData = {} as Request;
        this.requestData = _.cloneDeep(response);
        console.log(response);
        console.log(this.requestData);
      });*/
  }
  acceptRequest(): void {
    const newContract = {
      description: this.contractData.description,
      amount: this.contractData.amount,
      firstNameStudent: this.contractData.firstNameStudent,
      lastNameStudent: this.contractData.lastNameStudent,
    };
    this.contractDataService.createContract(this.studentId, this.propertyId, newContract)
      .subscribe((response: any) => {
        console.log(response);
        this.navigateToContracts();
        this.requestDataService.updateRequestState(this.requestId, RequestState.ACCEPTED)
          .subscribe(() => console.log('Request Accepted And Contract Created'));
      });
  }

  navigateToContracts(): void {
    this.router.navigate([`landlords/${this.landlordId}/contracts`]).then(() => null);
  }
  navigateToRequests(): void {
    this.router.navigate([`landlords/${this.landlordId}/requests`]).then(() => null);
  }
  addPayment(): void{
    this.router.navigate([`/contracts/${this.contractId}/payments/add`]).then(() => null);
  }
  navigateToList(): void {
    this.router.navigate([`/contracts/${this.contractId}/payment_history`]).then(() => null);
  }
  onSubmit(): void {
    if (this.contractForm.form.valid) {
      console.log(this.contractData);
      this.acceptRequest();
    } else {
      console.log('Invalid Data');
    }
  }
}
