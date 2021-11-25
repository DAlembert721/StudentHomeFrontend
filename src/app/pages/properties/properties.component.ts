import {Component, OnInit, ViewChild} from '@angular/core';
import {Property} from "../../models/property";
import {PropertyService} from "../../services/property.service";
import {PropertyImageService} from "../../services/property-image.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {
  @ViewChild('propertyForm', {static: false})
  propertyData: Property;
  propertyId: number;
  id: number;
  type: any;
  imgUrl = 'https://source.unsplash.com/1600x900/?bedroom,house';
  properties: Property[] = [];
  images: any[] = [];
  constructor(private propertyDataService: PropertyService,
              private propertyImageService: PropertyImageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.landlordId = Number(this.route.snapshot.paramMap.get('landlordId'));
    this.id = Number(localStorage.getItem('id'));
    this.retrievePropertiesByLandlordId(this.id);
    this.type = localStorage.getItem('type');
  }
  retrievePropertiesByLandlordId(id): void {
    this.propertyDataService.getPropertiesByLandlordId(id)
      .subscribe((response: any) => {
        this.properties = response.content;
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
  navigateToAddProperty(): void {
    if (this.type === 'landlord') {
      this.router.navigate([`/landlords/${this.id}/properties/add`]).then(() => null);
    }
  }
  navigateToPropertyDetails(element: Property): void {
    this.propertyId = element.id;
    this.router.navigate([`/landlords/${this.id}/properties/${this.propertyId}`]).then(() => null);
  }
}
