import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {


  oFoo: Observable<Object>;
  constructor(public http: HttpClient) { }
  data: any;

  makeRequest(): void {
    //oFoo : Observable<Foo[]>; va dichiarato tra gli attributi della classe
    this.oFoo = this.http.get('https://3000-b1dff558-df26-41e4-9733-d1b78a5ecf77.ws-eu01.gitpod.io/student/all');
    this.oFoo.subscribe(this.getData);
  }

  getData = (d : Object) =>
   {
     this.data = d;
   }


  ngOnInit(): void {
    ;
  }

}
