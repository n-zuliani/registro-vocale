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
  obs: Observable<any>;
  list: any;

  obsUnit: Observable<any>; //L’observable che sta in attesa dei dati
  data: any;

  SERVER_API_URL: string = 'https://3000-d17c705d-c9e8-4030-bbea-1c4fca1487ed.ws-eu01.gitpod.io';

  constructor(private http: HttpClient) { }

  getStudentList(): void {
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.obsUnit = this.http.get<any>(this.SERVER_API_URL + '/student/all', headers);
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    this.obsUnit.subscribe((list: any) => {this.list = list;});
  }

 ngOnInit() {
    this.obs = this.http.get<any>(this.SERVER_API_URL + '/student/all');
    this.obs.subscribe((list: any) => {this.list = list;});
  }
}
