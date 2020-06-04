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
    this.oFoo = this.http.get('https://3000-db69770a-f1e0-4ecf-923b-923f3f1000cf.ws-eu01.gitpod.io/student/all');
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
