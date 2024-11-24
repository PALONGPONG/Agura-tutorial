import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private readonly storageKey = 'students';
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  constructor() {
    const storedStudents = localStorage.getItem(this.storageKey);
    if (storedStudents) {
      this.student = JSON.parse(storedStudents);
    } else {
      this.student = [
        { id: 1, name: 'John', lastname: 'Doe' },
        { id: 2, name: 'Jane', lastname: 'Doe' },
        { id: 3, name: 'Jim', lastname: 'Doe' },
      ];
      this.saveToLocalStorage();
    }
  }

  private student: HousingLocation[];

  private saveToLocalStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.student));
  }

  editStudentById(id: number, name: string, lastname: string): void {
    const student = this.student.find((student) => student.id === id);
    if (student) {
      student.name = name;
      student.lastname = lastname;
      this.saveToLocalStorage();
    }
  }

  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.student.find((housingLocation) => housingLocation.id === id);
  }

  getAllHousingLocations(): HousingLocation[] {
    return this.student;
  }
  addStudent(name: string, lastname: string): void {
    const newId = this.student.length > 0 ? Math.max(...this.student.map(s => s.id)) + 1 : 1;
    const newStudent: HousingLocation = { id: newId, name, lastname };
    this.student.push(newStudent);
    this.saveToLocalStorage();
  }
  deleteStudentById(id: number): void {
    this.student = this.student.filter((student) => student.id !== id);
    this.saveToLocalStorage();
  }
}