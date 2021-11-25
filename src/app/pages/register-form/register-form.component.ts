import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user";
import {Account} from "../../models/account";
import {Student} from "../../models/student";
import {Landlord} from "../../models/landlord";
import {Region} from "../../models/region";
import {Province} from "../../models/province";
import {District} from "../../models/district";
import {EducationCenter} from "../../models/education-center";
import {UserService} from "../../services/user.service";
import {AccountService} from "../../services/account.service";
import {LandlordService} from "../../services/landlord.service";
import {StudentService} from "../../services/student.service";
import {LocationService} from "../../services/location.service";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EducationCenterService} from "../../services/education-center.service";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  userData: User = new User();
  accountData: Account = new Account();
  studentData: Student = new Student();
  landlordData: Landlord = new Landlord();
  selectedRegion: Region = null;
  selectedProvince: Province = null;
  selectedDistrict: District = null;
  selectedEducationCenter: EducationCenter = null;
  educationCenters: EducationCenter[] = [];
  regions: Region[] = [];
  provinces: Province[] = [];
  districts: District[] = [];
  selectedUser: string;
  isStudent = true;
  constructor(private formBuilder: FormBuilder,
              private userDataService: UserService,
              private accountDataService: AccountService,
              private landlordDataService: LandlordService,
              private studentDataService: StudentService,
              private locationService: LocationService,
              private authService: AuthService,
              private educationCenterService: EducationCenterService,
              private router: Router,
              private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(4)]],
      firstName: [null, [Validators.required, Validators.minLength(2)]],
      lastName: [null, [Validators.required, Validators.minLength(2)]],
      dni: [null, [Validators.required, Validators.minLength(8)]],
      phone: [null, [Validators.required, Validators.minLength(9)]],
      address: [null, [Validators.required, Validators.minLength(5)]]
    });
    this.retrieveAllRegions();
    this.retrieveEducationCenter();
    this.selectedUser = 'None';
  }
  onSubmit(): void {
    if (window.localStorage.getItem('type') !== null) {
      this.navigateToHome();
    }
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
  }
  addUser(): void {
    const newUser = {
      email: this.userData.email,
      username: this.userData.email,
      password: this.userData.password
    };
    this.authService.register(newUser)
      .subscribe((response: any) => {
        console.log(response);
        const credentials = {
          username: newUser.email,
          password: newUser.password
        };
        this.authService.login(credentials)
          .subscribe((response: any) => {
            this.createAccount(response.id);
          });
      });
  }
  createAccount(userId): void{
    if (this.isStudent) {
      const newStudent = {
        firstName: this.accountData.firstName,
        lastName: this.accountData.lastName,
        dni: this.accountData.dni,
        phone: this.accountData.phone,
        description: 'Hello, this is my description',
        image: 'image.jpg',
        address: this.studentData.address,
        districtId: this.selectedDistrict.id,
        educationCenterId: this.selectedEducationCenter.id,
      };
      this.studentDataService.createStudent(userId, newStudent)
        .subscribe((response: any) => {
          console.log(response);
          this.navigateToLogin();
        });
    }
    else {
      const newLandlord = {
        firstName: this.accountData.firstName,
        lastName: this.accountData.lastName,
        dni: this.accountData.dni,
        phone: this.accountData.phone,
        description: 'Hello, this is my description',
        image: 'image.jpg',
        subscriptionId: 1,
      };
      this.landlordDataService.createLandlord(userId, newLandlord)
        .subscribe((response: any) => {
          console.log(response);
          this.navigateToLogin();
        });
    }

  }
  navigateToLogin(): void {
    this.router.navigate([`/login`]).then(() => null);
  }
  selectStudent(): void {
    this.isStudent = true;
    this.registerForm.controls.address.enable();
  }
  selectLandlord(): void {
    this.isStudent = false;
    this.registerForm.controls.address.disable();
  }
  retrieveAllRegions(): void {
    this.locationService.getRegionById()
      .subscribe((response: any) => {
        this.regions = response.content;
        // console.log(response);
      });
  }

  retrieveProvinces(regionId): void {
    this.locationService.getProvincesByRegionId(regionId)
      .subscribe((response: any) => {
        this.provinces = response.content;
        // console.log(response);
      });
  }

  retrieveDistricts(provinceId): void {
    this.locationService.getDistrictsByProvinceId(provinceId)
      .subscribe((response: any) => {
        this.districts = response.content;
        // console.log(response);
      });
  }
  retrieveEducationCenter(): void {
    this.educationCenterService.getEducationCenters()
      .subscribe((response: any) => {
        this.educationCenters = response.content;
      });
  }
  navigateToHome(): void{
    this.router.navigate([`/home`]).then(() => null);
  }
}

