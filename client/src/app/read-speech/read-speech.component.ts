import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AudioRecordingService } from '../services/audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-read-speech',
  templateUrl: './read-speech.component.html',
  styleUrls: ['./read-speech.component.css']
})
export class ReadSpeechComponent implements OnInit, OnDestroy {

  SERVER_API_URL: string = 'https://3000-dcf43f32-cf80-44e6-8f12-d84a52685873.ws-eu01.gitpod.io';

  isRecording = false;
  recordedTime;
  blobUrl;

  progress: number = 0;
  loading: boolean = false;
  audioblob: any;

  data: any;

  constructor(public http: HttpClient, private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.audioblob = data.blob;
      this.readAudio();
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
  }

  ngOnInit(): void {
  }

  popup(data): void {
    data = data.toLowerCase();
    let res = data.split(' ');
    if (res[0] == "inserisci") {
      if (res[1] == "intervento") {
        this.inserisciIntervento(res);
      } else if (res[1] == "voto") {
        this.inserisciVoto(res);
      } else if (res[1] == "risposta") {
        this.inserisciRisposta(res);
      } else {
        document.getElementById("errore").innerHTML = "Errore: Il comando deve specificare cosa inserire (Voto, Intervento, Risposta).";
        return;
      }
    } else {
      document.getElementById("errore").innerHTML = "Errore: Il comando deve cominciare con 'Inserisci'";
      return;
    }
  }

  inserisciRisposta(res) {
    let voto: string = null;
    let cognome: string = null;
    let nome: string = null;
    let tipo: string = "R";
    for (let i = 0; i < res.length; i++) {
      if (res[i] == "valutazione") {
        voto = res[i + 1];
      } else if (res[i] == "studente") {
        cognome = res[i + 1];
        nome = res[i + 2 ];
      }
    }
    if (voto == null || cognome == null || nome == null) {
      document.getElementById("errore").innerHTML = "Errore: C'è stato qualche problema, reinserire il comando come suggerito sopra.";
    } else {
      var answer = window.confirm("Inserire risposta con valutazione " + voto + " allo studente " + cognome + " " + nome + "?");
      if (answer = true) {
        this.http.post(this.SERVER_API_URL + '/api/inserimentoVoto', {"voto": voto, "tipo": tipo, "nome": nome, "cognome": cognome});
        document.getElementById("successo").innerHTML = "Valutazione della risposta correttamente inserita!";
      } else {
        document.getElementById("errore").innerHTML = "Valutazione della risposta non inserita.";
      }
    }
  }

  inserisciIntervento(res) {
    let voto: string = null;
    let cognome: string = null;
    let nome: string = null;
    let tipo: string = "I";
    for (let i = 0; i < res.length; i++) {
      if (res[i] == "valutazione") {
        voto = res[i + 1];
      } else if (res[i] == "studente") {
        cognome = res[i + 1];
        nome = res[i + 2 ];
      }
    }
    if (voto == null || cognome == null || nome == null) {
      document.getElementById("errore").innerHTML = "Errore: C'è stato qualche problema, reinserire il comando come suggerito sopra.";
    } else {
      var answer = window.confirm("Inserire l'intervento con valutazione " + voto + " allo studente " + cognome + " " + nome + "?");
      if (answer = true) {
        this.http.post(this.SERVER_API_URL + '/api/inserimentoVoto', {"voto": voto, "tipo": tipo, "nome": nome, "cognome": cognome});
        document.getElementById("successo").innerHTML = "Valutazione dell' intervento correttamente inserita!";
      } else {
        document.getElementById("errore").innerHTML = "Valutazione dell' intervento non inserita.";
      }
    }
  }

  inserisciVoto(res) {
    let voto: string = null;
    let cognome: string = null;
    let nome: string = null;
    let tipo: string = "V";
    for (let i = 0; i < res.length; i++) {
      if (res[i] == "voto") {
        voto = res[i + 1];
      } else if (res[i] == "studente") {
        cognome = res[i + 1];
        nome = res[i + 2 ];
      }
    }
    if (voto == null || cognome == null || nome == null) {
      document.getElementById("errore").innerHTML = "Errore: C'è stato qualche problema, reinserire il comando come suggerito sopra.";
    } else {
      var answer = window.confirm("Inserire il voto " + voto + " allo studente " + cognome + " " + nome + "?");
      if (answer = true) {
        this.http.post(this.SERVER_API_URL + '/api/inserimentoVoto', {"voto": voto, "tipo": tipo, "nome": nome, "cognome": cognome});
        document.getElementById("successo").innerHTML = "Voto correttamente inserito!";
      } else {
        document.getElementById("errore").innerHTML = "Voto non inserito.";
      }
    }
  }

  readAudio(): void {
    let formData = new FormData();
    formData.append("uploads", this.audioblob, this.audioblob['name']);
    this.loading = true;
    this.http.post(this.SERVER_API_URL + '/speech', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if (events.type == HttpEventType.UploadProgress) {
          this.progress = Math.round(events.loaded / events.total * 100);
        } else if (events.type === HttpEventType.Response) {
          this.progress = 0;
          let res = events.body;
          this.data = res;
          this.loading = false;
          this.clearRecordedData();
          this.popup(this.data['text']);
        }
      });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

}
