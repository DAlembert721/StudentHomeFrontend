import { Component, OnInit } from '@angular/core';
import {ContractService} from "../../services/contract.service";
import {PropertyService} from "../../services/property.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.css']
})
export class ContractListComponent implements OnInit {

  contracts: any[];
  id: number;
  type: any;
  constructor(private contractDataService: ContractService,
              private propertyService: PropertyService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.contracts = [];
    this.initialize();
    /*this.contracts.push({
        amount: 100,
        createdAt: new Date(),
        description: 'Having met the requirements\n' +
          'I ... Name, Surname, confirm the contract of ... Student Student Last name\n' +
          'The monthly charge will be S / XXX.XX ....\n' +
          'Additional clauses are...',
        firstNameLandlord: 'Mephisto',
        firstNameStudent: 'Samael',
        lastNameLandlord: 'Pheles',
        lastNameStudent: 'Veracruz',
        state: false,
        id: 1
    });*/
  }
  initialize(): void {
    this.id = Number(this.route.params.subscribe(params => {
      const id = params.id;
      this.type = localStorage.getItem('type');
      if (this.type === 'student') {
        this.retrieveContractsByStudentId(id);
      }
      else {
        this.retrievePropertiesByLandLordId(id);
      }
      return id;
    }));
  }
  retrieveContractsByStudentId(studentId): void {
    this.contractDataService.getContractsByStudentId(studentId)
      .subscribe((response: any) => {
        for (const resource of response.content) {
          // console.log(resource);
          this.propertyService.getPropertyById(resource.propertyId)
            .subscribe((result: any) => {
              // console.log(result);
              const data = {
                id: resource.id,
                createdAt: resource.createdAt,
                description: resource.description,
                state: resource.state,
                studentFullName: resource.firstNameStudent + ' ' + resource.lastNameStudent,
                landlordFullName: result.landLordFirstName + ' ' + result.landLordLastName,
                amount: resource.amount
              };
              this.contracts.push(data);
            });


        }
        // console.log(this.contracts);
      });
  }
  retrieveContractsByPropertyId(property): void {
    // console.log(property);
    this.contractDataService.getContractsByPropertyId(property.id)
      .subscribe((response: any) => {
        for (const resource of response.content) {
          const data = {
            id: resource.id,
            createdAt: resource.createdAt,
            description: resource.description,
            state: resource.state,
            studentFullName: resource.firstNameStudent + ' ' + resource.lastNameStudent,
            landlordFullName: property.landLordFirstName + ' ' + property.landLordLastName,
            amount: resource.amount
          };
          this.contracts.push(data);
        }

        console.log(ContractState.CANCELED.toString());
        // console.log(this.contracts);
      });
  }
  retrievePropertiesByLandLordId(landlordId): void {
    this.propertyService.getPropertiesByLandlordId(landlordId)
      .subscribe((response: any) => {
        const properties = response.content;
        for (const property of properties) {
          this.retrieveContractsByPropertyId(property);
        }
      });
  }
  concludeContract(contractId): void {
    this.contractDataService.updateContractState(contractId, ContractState.CONCLUDED)
      .subscribe((response: any) => {
        // const index = this.contracts.indexOf(contract);
        // this.contracts[index] = response;
        console.log('Contract Has Concluded', response);
        window.location.reload();
      });
  }
  acceptContract(contractId): void{
    this.contractDataService.updateContractState(contractId, ContractState.ACTIVE)
      .subscribe((response: any) => {
        // const index = this.contracts.indexOf(contract);
        // this.contracts[index] = response;
        console.log('Contract Has Been Accepted', response);
        window.location.reload();
      });
  }
  denyContract(contractId): void{
    this.contractDataService.updateContractState(contractId, ContractState.CANCELED)
      .subscribe((response: any) => {
        // const index = this.contracts.indexOf(contract);
        // this.contracts[index] = response;
        console.log('Contract Has Been Canceled', response);
        window.location.reload();
      });
  }
  cancelContract(contractId): void{
    this.contractDataService.updateContractState(contractId, ContractState.CANCELED)
      .subscribe((response: any) => {
        // const index = this.contracts.indexOf(contract);
        // this.contracts[index] = response;
        console.log('Contract Has Been Canceled', response);
        window.location.reload();
      });
  }
  addPayment(contractId): void {
    console.log(ContractState.CANCELED.toString());
  }
  viewContract(id): void{
    this.router.navigate([`/contracts/${id}`]).then(() => null);
  }
}
