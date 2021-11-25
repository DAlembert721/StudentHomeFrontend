import { Component, OnInit } from '@angular/core';
import {Property} from "../../models/property";
import {Service} from "../../models/service";
import {PropertyService} from "../../services/property.service";
import {ServiceService} from "../../services/service.service";
import {PropertyImageService} from "../../services/property-image.service";
import {CommentService} from "../../services/comment.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css']
})
export class PropertyDetailsComponent implements OnInit {
  type: any;
  propertyData: Property;
  id: number;
  propertyId: number;
  // studentImage = 'https://source.unsplash.com/900x900/?face,young';
  imgUrls = [];
  services: Service[];
  selectedIng: string;
  showQualification = false;
  propertyComments: Comment[] = [];
  constructor(private propertyDataService: PropertyService,
              private serviceService: ServiceService,
              private propertyImageService: PropertyImageService,
              private commentService: CommentService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    this.retrievePropertyById(this.propertyId);
    this.route.params.subscribe(params => {
      this.type = localStorage.getItem('type');
      this.id = Number(params.id);
    });

  }
  retrievePropertyById(id): void {
    this.propertyDataService.getPropertyById(id)
      .subscribe((response: Property) => {
        this.propertyData = {} as Property;
        this.propertyData = _.cloneDeep(response);
        this.retrievePropertyImages(this.propertyId);
        this.retrieveServices(this.propertyId);
        this.retrieveCommentsByProperty(this.propertyId);
        // console.log(response);
        // console.log(this.propertyData);
      }, error => console.log(error));
  }
  retrieveServices(propertyId): void {
    this.serviceService.getAllServicesByPropertyId(propertyId)
      .subscribe((response: any) => {
        this.services = response.content;
      }, error => console.log(error));
  }
  retrievePropertyImages(propertyId): void{
    this.imgUrls = [];
    this.propertyImageService.getAllPropertyImagesByPropertyId(propertyId)
      .subscribe((response: any) => {
        const images = response.content;
        for (const image of images) {
          this.imgUrls.push(image.url);
        }
        this.selectedIng = this.imgUrls[0];
      });
  }
  retrieveCommentsByProperty(propertyId): void {
    this.commentService.getAllCommentsByPropertyId(propertyId)
      .subscribe((response: any) => {
        this.propertyComments = response.content;
      }, error => console.log(error));
  }
  changeImage(imgUrl): void{
    this.selectedIng = imgUrl;
  }
  navigateToRequest(): void{
    this.router.navigate([`/students/${this.id}/requests/${this.propertyId}`]).then(() => null);
  }
  navigateToEdit(): void{
    this.router.navigate([`/landlords/${this.id}/properties/${this.propertyId}/edit`]).then(() => null);
  }
}
