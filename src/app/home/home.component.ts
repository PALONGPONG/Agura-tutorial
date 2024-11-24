import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housinglocation';
import {HousingService} from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <h1>เพิ่มรายชื่อ</h1>
      <form class="search" (submit)="createstudent() ">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName"  />
          <button type="submit" class="">บันทึก</button>
    </form>
    </section>
    <section class="results">
      <app-housing-location class="listing"
        *ngFor="let housingLocation of housingLocationList"
        [housingLocation]="housingLocation"
      ></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  applyForm: any;
createstudent() {
    this.housingService.addStudent(
      (document.getElementById('first-name') as HTMLInputElement).value,
      (document.getElementById('last-name') as HTMLInputElement).value
    );
}
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
  }
}