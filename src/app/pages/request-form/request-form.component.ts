import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Property} from "../../models/property";
import {Student} from "../../models/student";
import {PropertyService} from "../../services/property.service";
import {RequestService} from "../../services/request.service";
import {StudentService} from "../../services/student.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  @ViewChild('requestForm', {static: false})
  requestForm: NgForm;
  propertyId: number;
  studentId: number;
  requestData: Request;
  propertyData: Property;
  studentData: Student;

  constructor(private propertyDataService: PropertyService,
              private requestDataService: RequestService,
              private studentDataService: StudentService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.studentId = Number(this.route.snapshot.paramMap.get('studentId'));
    this.propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    this.retrievePropertyById(this.propertyId);
    this.retrieveStudentById(this.studentId);
  }

  retrievePropertyById(id): void {
    this.propertyDataService.getPropertyById(id)
      .subscribe((response: Property) => {
        this.propertyData = {} as Property;
        this.propertyData = _.cloneDeep(response);
        // console.log(response);
        // console.log(this.propertyData);
      });
  }
  retrieveStudentById(id): void {
    this.studentDataService.getStudentByStudentId(id)
      .subscribe((response: Student) => {
        this.studentData = {} as Student;
        this.studentData = _.cloneDeep(response);
        // console.log(response);
        // console.log(this.studentData);
      });
  }
  sendRequest(): void {
    const newRequest = {
      content: this.requestData.content,
    };
    this.requestDataService.createRequest(this.studentId, this.propertyId, newRequest)
      .subscribe((response: any) => {
        // console.log(response);
        this.navigateToRequests();
      });
  }

  navigateToProperties(): void {
    this.router.navigate([`/home`]).then(() => null);
  }
  navigateToRequests(): void {
    this.router.navigate([`students/${this.studentId}/requests`]).then(() => null);
  }

  onSubmit(): void {
    if (this.requestForm.form.valid) {
      // console.log(this.requestData);
      this.sendRequest();
    } else {
      console.log('Invalid Data');
    }
  }
}
