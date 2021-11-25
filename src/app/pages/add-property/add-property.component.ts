import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Region} from "../../models/region";
import {Province} from "../../models/province";
import {District} from "../../models/district";
import {Property} from "../../models/property";
import {Service} from "../../models/service";
import {PropertyService} from "../../services/property.service";
import {LocationService} from "../../services/location.service";
import {ServiceService} from "../../services/service.service";
import {PropertyImageService} from "../../services/property-image.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit, AfterViewInit {
  @ViewChild('propertyForm', {static: false})
  isEdit: boolean;
  actualDate = Date();
  propertyForm: NgForm;
  propertyId: number;
  landlordId: number;
  selectedRegion: Region;
  selectedProvince: Province;
  selectedDistrict: District;
  regions: Region[] = [];
  provinces: Province[] = [];
  districts: District[] = [];
  propertyData: Property;
  currentFile: File;
  fileName: string;
  imgUrls = ['https://source.unsplash.com/1600x900/?bedroom',
    'https://source.unsplash.com/1600x900/?bedroom,house',
    'https://source.unsplash.com/1600x900/?bed',
    'https://source.unsplash.com/1600x900/?bathroom',
    'https://source.unsplash.com/1600x900/?bedroom,home'];
  services: Service[] = [];
  saveImgs: string[] = [];
  servicesSelected: boolean[] = [];
  selectedImg: string;

  constructor(private propertyDataService: PropertyService,
              private locationService: LocationService,
              private serviceService: ServiceService,
              private propertyImageService: PropertyImageService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log(this.propertyData);
    // this.initialize();
    this.landlordId = Number(this.route.snapshot.paramMap.get('landlordId'));
    this.propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    console.log(this.propertyData);
    // console.log(this.landlordId);
    this.retrieveRegions();
  }

  ngAfterViewInit(): void {
    // console.log(this.propertyId);
    // console.log(this.isEdit);
  }
  checkMode(): void {
    setTimeout(() => {
      if (this.propertyId === 0) {
        this.isEdit = false;
      } else {
        this.isEdit = true;
        this.retrieveProperty();
      }
      this.retrieveAllServices();
    });
  }
  initialize(): void {
    this.propertyData.title = null;
    this.propertyData.id = null;
    this.propertyData.provinceName = null;
    this.propertyData.regionName = null;
    this.propertyData.districtName = null;
    this.propertyData.rooms = null;
    this.propertyData.size = null;
    this.propertyData.place = null;
    this.propertyData.landLordLastName = null;
    this.propertyData.landLordFirstName = null;
    this.propertyData.address = null;
    this.propertyData.landLordId = null;
    this.propertyData.description = null;
    this.propertyData.active = null;
    this.propertyData.cost = null;
    this.propertyData.districtId = null;
    this.propertyData.provinceId = null;
    this.propertyData.regionId = null;
  }

  retrieveProperty(): void {
    // console.log(this.propertyId);
    this.propertyDataService.getPropertyById(this.propertyId)
      .subscribe((response: any) => {
        this.propertyData = {} as Property;
        this.propertyData = _.cloneDeep(response);
        const index = this.regions.map((e) => e.id).indexOf(this.propertyData.regionId);
        this.selectedRegion = this.regions[index];
        this.retrieveProvinces(this.selectedRegion.id);
      });
  }

  retrieveRegions(): void {
    this.locationService.getRegionById()
      .subscribe((response: any) => {
        this.regions = response.content;
        this.checkMode();
      });
  }

  retrieveProvinces(regionId): void {
    this.locationService.getProvincesByRegionId(regionId)
      .subscribe((response: any) => {
        this.provinces = response.content;
        if (this.isEdit) {
          const index = this.provinces.map((e) => e.id).indexOf(this.propertyData.provinceId);
          // console.log(index);
          this.selectedProvince = this.provinces[index];
          this.retrieveDistricts(this.selectedProvince.id);
        }
      });
  }

  retrieveDistricts(provinceId): void {
    this.locationService.getDistrictsByProvinceId(provinceId)
      .subscribe((response: any) => {
        this.districts = response.content;
        if (this.isEdit) {
          const index = this.districts.map((e) => e.id).indexOf(this.propertyData.districtId);
          this.selectedDistrict = this.districts[index];
        }
      });
  }

  addOrUpdateProperty(): void {
    const newProperty = {
      rooms: this.propertyData.rooms,
      size: this.propertyData.size,
      cost: this.propertyData.cost,
      active: true,
      address: this.propertyData.address,
      title: this.propertyData.title,
      description: this.propertyData.description,
      place: this.selectedDistrict.id,
    };
    // console.log(this.landlordId);
    if (!this.isEdit) {
      // console.log(this.landlordId);
      this.propertyDataService.createProperty(this.landlordId, newProperty)
        .subscribe((response: any) => {
          // console.log(response);
          for (const selectElement of this.servicesSelected) {
            this.serviceService.addServiceToProperty(response.id, this.services[this.servicesSelected.indexOf(selectElement)].id)
              .subscribe((result: any) => {
                // console.log(result);
              });
          }
          for (const image of this.imgUrls) {
            const data = {
              url: image
            };
            this.propertyImageService.addPropertyImageToProperty(response.id, data)
              .subscribe((result: any) => {
                // console.log(result);
              });
          }
          this.navigateToProperty(response.id);
        });
    } else {
      this.propertyDataService.updateProperty(this.landlordId, this.propertyData.id, newProperty)
        .subscribe((response: any) => {
          // console.log(response);
          for (const selectElement of this.servicesSelected) {
            this.serviceService.addServiceToProperty(response.id, this.services[this.servicesSelected.indexOf(selectElement)].id)
              .subscribe((result: any) => {
                // console.log(result);
              });
          }
          for (const image of this.imgUrls) {
            const data = {
              url: image
            };
            this.propertyImageService.addPropertyImageToProperty(response.id, data)
              .subscribe((result: any) => {
                console.log(result);
              });
          }
          this.navigateToProperty(response.id);
        });
    }
    // this.navigateToProperties();
  }

  navigateToProperty(propertyId): void {
    this.router.navigate([`/landlords/${this.landlordId}/properties/${propertyId}`]).then(() => null);
  }
  navigateToPropertiesList(): void {
    this.router.navigate([`/home`]).then(() => null);
  }
  onSubmit(): void {
    if (this.propertyForm.form.valid) {
      // console.log(this.propertyData);
      this.addOrUpdateProperty();
    } else {
      console.log('Invalid Data');
    }
  }

  onFileUpload(event): void {
    this.currentFile = event.target.files[0];
    this.fileName = this.currentFile.name;
    this.saveImgs.push(this.imgUrls[this.saveImgs.length]);
    // console.log(this.fileName);
  }

  changeImage(imgUrl): void {
    this.selectedImg = imgUrl;
  }

  deleteImage(img): void {
    const index = this.imgUrls.indexOf(img);
    this.imgUrls.splice(index, 1);
    // console.log('deleting image');
  }

  retrieveAllServices(): void {
    this.serviceService.getAllServices()
      .subscribe((response: any) => {
        this.services = response.content;
        for (const service of this.services) {
          this.servicesSelected.push(false);
        }
        if (this.isEdit){
          this.retrieveAllServicesByPropertyId(this.propertyId);
        }
      });
  }
  retrieveAllServicesByPropertyId(propertyId): void {
    this.serviceService.getAllServicesByPropertyId(propertyId)
      .subscribe((response: any) => {
        const resources = response.content;
        for (const resource of resources) {
          if (this.services.some(v => v.id === resource.id )) {
            const pos = this.services.map((e) => e.id).indexOf(resource.id);
            this.servicesSelected[pos] = true;
          }
        }
      });
  }
}
