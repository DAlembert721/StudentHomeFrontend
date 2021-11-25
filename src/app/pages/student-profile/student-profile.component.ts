import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Student} from "../../models/student";
import {Opinion} from "../../models/opinion";
import {StudentService} from "../../services/student.service";
import {OpinionService} from "../../services/opinion.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {

  @ViewChild('studentForm', {static: false})
  studentForm: NgForm;
  studentData: Student;
  studentId: number;
  isEditMode = false;
  userId: number;
  opinions: Opinion[] = [];
  windowsSize: number;
  photoCols: number;
  detailCols: number;
  photoRows: number;
  detailRows: number;
  photoHeight: number;
  type: any;
  showQualification = false;
  landlordImage = 'https://source.unsplash.com/900x900/?face,adult,parent';

  constructor(private studentDataService: StudentService,
              private opinionService: OpinionService,
              private  router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.initialize();
    this.windowsSize = (window.innerHeight <= 360) ? 3 : 12;
    this.detailCols = (window.innerHeight <= 360) ? 3 : 9;
    this.photoCols = (window.innerHeight <= 360) ? 3 : 3;
    this.photoRows = (window.innerHeight <= 360) ? 6 : 12;
    this.detailRows = (window.innerHeight <= 360) ? 5 : 11;
    this.photoHeight = (window.innerHeight <= 360) ? 10 : 35;
  }
  initialize(): void {
    this.studentId = Number(this.route.params.subscribe(params => {
      let id;
      if (params.id) {
        id = params.id;
        console.log(id);
        this.retrieveCommentsByStudentId(id);
        this.retrieveStudentByStudentId(id);
        this.isEditMode = false;
      } else if (params.userId && params.studentId) {
        const userId = params.userId;
        id = params.studentId;
        console.log(userId);
        console.log(id);
        this.retrieveCommentsByStudentId(id);
        this.retrieveStudentByUserIdAndStudentId(userId, id);
        this.isEditMode = true;
        this.userId = userId;
      }
      return id;
    }));
  }
  onResize(event): void {
    console.log(event.target);
    this.windowsSize = (event.target.innerHeight <= 360) ? 3 : 12;
    this.detailCols = (event.target.innerHeight <= 360) ? 3 : 9;
    this.photoCols = (event.target.innerHeight <= 360) ? 3 : 3;
    this.photoRows = (event.target.innerHeight <= 360) ? 4 : 12;
    this.detailRows = (event.target.innerHeight <= 360) ? 5 : 11;
    this.photoHeight = (event.target.innerHeight <= 360) ? 10 : 35;
  }
  retrieveStudentByStudentId(id): void {
    this.studentDataService.getStudentByStudentId(id)
      .subscribe((response: Student) => {
        this.studentData = {} as Student;
        this.studentData = _.cloneDeep(response);
        console.log(response);
        console.log(this.studentData);
      });
  }

  retrieveStudentByUserIdAndStudentId(userId, studentId): void {
    this.studentDataService.getStudentByUserIdAndStudentId(userId, studentId)
      .subscribe((response: Student) => {
        this.studentData = {} as Student;
        this.studentData = _.cloneDeep(response);
        console.log(response);
        console.log(this.studentData);
      });
  }

  updateStudent(): void {
    this.studentDataService.updateStudent(this.userId, this.studentData.id, this.studentData as Student);
  }

  retrieveCommentsByStudentId(studentId): void {
    this.opinionService.getAllOpinionsByStudentId(studentId).subscribe((response: any) => {
      console.log(response);
      this.opinions = response.content;
    });
  }

  onSubmit(): void {
    if (this.studentForm.form.valid) {
      console.log(this.studentData);
      if (this.isEditMode) {
        this.updateStudent();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  generateArray(score): number[]{
    const array = [];
    for (let i = 0; i < score; i++) {
      array.push(i);
    }
    return array;
  }
}
