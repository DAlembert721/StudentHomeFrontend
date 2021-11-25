import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Landlord} from "../../models/landlord";
import {LandlordService} from "../../services/landlord.service";
import {PropertyService} from "../../services/property.service";
import {Property} from "../../models/property";
import {PropertyImageService} from "../../services/property-image.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-landlord-profile',
  templateUrl: './landlord-profile.component.html',
  styleUrls: ['./landlord-profile.component.css']
})
export class LandlordProfileComponent implements OnInit {
  @ViewChild('landlordForm', {static: false})
  landlordForm: NgForm;
  landlordData: Landlord;
  landlordId: number;
  isEditMode = false;
  userId: number;
  properties: Property[];
  type: any;
  imgUrl = 'https://source.unsplash.com/1600x900/?room,house,home';
  images: any[] = [];
  constructor(private landlordDataService: LandlordService,
              private propertyService: PropertyService,
              private propertyImageService: PropertyImageService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.type = localStorage.getItem('type');
    this.landlordId = Number(this.route.params.subscribe(params => {
      let id;
      if (params.id) {
        console.log('un solo id');
        id = params.id;
        console.log(id);
        this.retrieveLandlordByLandlordId(id);
        // this.isEditMode = false;
      } else
      if (params.userId && params.landlordId) {
        const userId = params.userId;
        id = params.landlordId;
        console.log(userId);
        console.log(id);
        this.retrieveLandlordByUserIdAndLandlordId(userId, id);
        //       this.isEditMode = true;
        this.userId = userId;
      }
      this.retrievePropertiesByLandlordId(id);
      return id;
    }));
  }

  retrieveLandlordByLandlordId(id): void {
    this.landlordDataService.getLandlordByUserId(id, id)
      .subscribe((response: Landlord) => {
        this.landlordData = {} as Landlord;
        this.landlordData = _.cloneDeep(response);
        console.log(response);
        console.log(this.landlordData);
      });
  }

  retrieveLandlordByUserIdAndLandlordId(userId, landlordId): void {
    this.landlordDataService.getLandlordByUserId(userId, landlordId)
      .subscribe((response: Landlord) => {
        this.landlordData = {} as Landlord;
        this.landlordData = _.cloneDeep(response);
        console.log(response);
        console.log(this.landlordData);
      });
  }
  retrievePropertiesByLandlordId(landlordId): void {
    this.propertyService.getPropertiesByLandlordId(landlordId)
      .subscribe((response: any) => {
        this.properties = response.content;
        console.log(this.properties);
        for (const property of this.properties) {
          this.retrieveImagesByPropertyId(property.id);
        }
      });
  }
  retrieveImagesByPropertyId(propertyId): void {
    this.propertyImageService.getAllPropertyImagesByPropertyId(propertyId)
      .subscribe((response: any) => {
        const images = response.content;
        for (const image of images) {
          const data = {
            id: propertyId,
            url: image.url,
          };
          this.images.push(data);
        }
      });
  }
  getImage(propertyId): string {
    const image = this.images.filter(v => v.id === propertyId);
    return image[0].url;
  }

  updateLandlord(): void {
    this.landlordDataService.updateLandlord(this.userId, this.landlordData.id, this.landlordData as Landlord);
  }
  navigateToLandlordProperties(landlordId): void{
    this.router.navigate([`/landlords/${landlordId}/properties`]).then(() => null);
  }
  onSubmit(): void {
    if (this.landlordForm.form.valid) {
      console.log(this.landlordData);
      if (this.isEditMode) {
        this.updateLandlord();
      }
    } else {
      console.log('Invalid Data');
    }
  }
  navigateToPropertyDetails(element: Property): void {
    this.router.navigate([`/landlords/${this.landlordId}/properties/${element.id}`]).then(() => null);
  }
}
