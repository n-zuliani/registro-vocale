import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './Student.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obs: Observable<Student[]>;
  list: Student[];

  obsUnit: Observable<Student[]>; //L’observable che sta in attesa dei dati
  data: Student[];

  constructor(private http: HttpClient) { }

  getStudentList(): void {
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.obsUnit = this.http.get<Student[]>('https://3000-e3d7f01a-e8d4-401d-a916-b527b20ac4fb.ws-eu01.gitpod.io/student/all', headers);
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((list: Student[]) => {this.list = list;});
  }

 ngOnInit() {
    this.obs = this.http.get<Student[]>('https://3000-e3d7f01a-e8d4-401d-a916-b527b20ac4fb.ws-eu01.gitpod.io/student/all');
    this.obs.subscribe((list: Student[]) => {this.list = list;});
  }
}
