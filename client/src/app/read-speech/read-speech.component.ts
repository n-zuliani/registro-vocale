import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-read-speech',
  templateUrl: './read-speech.component.html',
  styleUrls: ['./read-speech.component.css']
})
export class ReadSpeechComponent implements OnInit {

  constructor(public http: HttpClient) { }
  o: Observable<Object>;
  data: any;

  ngOnInit(): void {
    this.o = this.http.get('https://3000-e1b6f371-04be-4e91-8e2d-1e7328a3ab4d.ws-eu01.gitpod.io/speech');
    this.o.subscribe(data => {this.data = data; this.popup(this.data.text)});
  }

  popup(data): void {
    let res = data.split(' ');
    var stringa = "Aggiungere voto " + res[3] + " a " + res[6] //La frase deve essere sempre: "Aggiungere il voto <numero> allo studente <persona>"
    var answer = window.confirm(stringa);
    if (answer = true){
      //AGGIUNGI VOTO
    }else{
      //NON AGGIUNGERE IL VOTO
    }
  }

}
