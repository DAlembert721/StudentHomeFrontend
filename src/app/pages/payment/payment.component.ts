import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Payment} from "../../models/payment";
import {Contract} from "../../models/contract";
import {Student} from "../../models/student";
import {Property} from "../../models/property";
import {PaymentService} from "../../services/payment.service";
import {ContractService} from "../../services/contract.service";
import {PropertyService} from "../../services/property.service";
import {StudentService} from "../../services/student.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  paymentId: number;
  contractId: number;
  payment: Payment;
  contract: Contract;
  student: Student;
  property: Property;
  isView = false;
  dataField: any;
  constructor(
    private paymentService: PaymentService,
    private contractService: ContractService,
    private propertyService: PropertyService,
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('paymentId'));
    this.contractId = Number(this.route.snapshot.paramMap.get('contractId'));
    console.log(this.contractId);
    this.retrievePaymentById();
    this.retrieveContract();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if ( this.paymentId === 0) {
        this.isView = false; }
      else {
        this.isView = true;
      }});
    console.log(this.isView);
  }
  retrievePaymentById(): void{
    this.paymentService.getPaymentById(this.paymentId)
      .subscribe((response: any) => {
        this.payment = response;
        this.dataField = {
          pay: this.payment.pay,
          image: this.payment.image,
          comment: this.payment.comment
        };
        console.log(this.payment);
      });
  }
  retrieveContract(): void {
    this.contractService.getContractsById(this.contractId)
      .subscribe((response: any) => {
        this.contract = response;
        this.retrieveProperty(this.contract.propertyId);
        this.retrieveStudent(this.contract.studentId);
      });
  }
  retrieveProperty(propertyId): void{
    this.propertyService.getPropertyById(propertyId)
      .subscribe((response: any) => {
        this.property = response;
      });
  }
  retrieveStudent(studentId): void{
    this.studentService.getStudentByStudentId(studentId)
      .subscribe((response: any) => {
        this.student = response;
      });
  }
  updatePayment(): void{
    this.paymentService.updatePayment(this.paymentId, this.dataField)
      .subscribe((response: any) => {
        console.log(response);
        window.location.reload();
      });
  }

}
