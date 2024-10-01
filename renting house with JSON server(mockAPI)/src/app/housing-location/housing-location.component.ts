import { Component, Input } from '@angular/core';
import { Housinglocation } from '../housinglocation';

@Component({
  selector: 'app-housing-location',
  templateUrl: './housing-location.component.html',
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {

  imgUrl = 'https://img.icons8.com/?size=100&id=7880&format=png'
  @Input() housingLocation !: Housinglocation;
}
