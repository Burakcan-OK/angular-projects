import { Component, inject } from '@angular/core';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  housingService: HousingService = inject(HousingService)

  housingLocationList: Housinglocation[] = [];
  filteredLocationList: Housinglocation[] = [];

  constructor () {
    this.housingService.getAllHousingLocations().then((housingLocationList : Housinglocation[]) => {
      this.housingLocationList = housingLocationList
      this.filteredLocationList = this.housingLocationList
    })
    
  }

  filteredResults(text:string) {
    if(!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) => 
      housingLocation?.city.toLocaleLowerCase().includes(text.toLocaleLowerCase()))
  }

  resetResults() {
    this.filteredLocationList = this.housingLocationList
  }

  
}

