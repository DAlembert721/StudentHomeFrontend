import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDatepicker} from "@angular/material/datepicker";
import {PaymentService} from "../../services/payment.service";
import {ContractService} from "../../services/contract.service";
import {PropertyService} from "../../services/property.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rent-history',
  templateUrl: './rent-history.component.html',
  styleUrls: ['./rent-history.component.css']
})
export class RentHistoryComponent implements OnInit, AfterViewInit {
  type: string;
  payments: any[] = [];
  accountId: number;
  contractId: number;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [ 'image', 'id', 'pay', 'comment', 'createdAt', 'updatedAt', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;

  constructor(
    private paymentService: PaymentService,
    private contractService: ContractService,
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.contractId = Number(params.contractId);
      this.retrievePayments();
    });
    this.dataSource.sort = this.sort;
    // this.getAllPPayments();
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  navigateToPayment(paymentId): void{
    this.router.navigate([`/contracts/${this.contractId}/payment_history/${paymentId}`]).then(() => null);
  }
  retrievePayments(): void {
    this.paymentService.getPaymentsByContractId(this.contractId)
      .subscribe((response: any) => {
        const results = response.content;
        for (const result of results) {
          const data = {
            id: result.id,
            pay: result.pay,
            image: result.image,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
          };
          this.payments.push(data);
        }
        console.log(this.payments);
        this.dataSource.data = this.payments;
        console.log(this.dataSource.data);
      });

  }

}
