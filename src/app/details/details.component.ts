import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article class="articledetails">
 
      
      
      <section class="listing-apply">
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName" />
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName"  />
          <button type="submit" class="save">บันทึก</button>
        </form>
        <button (click)="deleteApplication()" class="delete">ลบรายชื่อ</button>
        <button (click)="navigateHome()" class="back">ยกเลิก</button>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
deleteApplication() {
if (confirm('Are you sure you want to delete this application?')) {
  this.housingService.deleteStudentById(this.housingLocation?.id ?? 0);
  window.location.href = '/';
}

}

navigateHome() {
  window.location.href = '/';
}
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm!: FormGroup;

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocation = this.housingService.getHousingLocationById(housingLocationId);
    this.applyForm = new FormGroup({
      firstName: new FormControl(this.housingLocation?.name ?? ''),
      lastName: new FormControl(this.housingLocation?.lastname ?? ''),
    });
  }
  
  submitApplication() {
    this.housingService.editStudentById(
      this.housingLocation?.id ?? 0,
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
    );
    window.location.href = '/';
  }
}