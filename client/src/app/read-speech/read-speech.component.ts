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

  SERVER_API_URL: string = 'https://3000-fe6f28cd-06fe-4850-a379-8ba10515dc04.ws-eu01.gitpod.io';

  isRecording = false;
  recordedTime;
  blobUrl;

  progress: number = 0;
  loading: boolean = false;
  audioblob: any;

  constructor(public http: HttpClient, private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      console.log("PROVIAMO: " + data.blob)
      this.audioblob=data.blob;
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      console.log(this.blobUrl);
    });
  }
  o: Observable<Object>;
  data: any;

  ngOnInit(): void {
    //this.o = this.http.get('https://3000-ec08a519-78a2-4ec4-95ac-e3611b882280.ws-eu01.gitpod.io/speech');
    //this.o.subscribe(data => { this.data = data; this.popup(this.data.text) });
  }

  popup(data): void {
    let res = data.split(' ');
    if (res[0] == "Inserisci") {
      if (res[1] == "nota") {
        this.inserisciNota(res);
      } else if (res[1] == "voto") {
        this.inserisciVoto(res);
      } else {
        //PRINTA MESSAGGIO DI ERRORE
        return;
      }
    } else {
      //PRINTA UN MESSAGGIO DI ERRORE
      return;
    }
  }

  inserisciNota(res) {
    //NOTA
  }

  inserisciVoto(res) {
    let voto: string = null;
    let studente: string = null;
    for (let i = 2; i < res.lenght(); i++) {
      if (res[i] == "voto") {
        voto = res[i + 1].value;
      } else if (res[i] == "studente") {
        studente = res[i + 1].value;
      }
    }
    if (voto == null || studente == null) {
      //PRINTA MESSAGGIO DI ERRORE
    } else {
      var answer = window.confirm("Inserire il voto " + voto + " allo studente " + studente + "?");
      if (answer = true) {
        //AGGIUNGI VOTO
      } else {
        //NON AGGIUNGERE IL VOTO
      }
    }
  }

  readAudio(): void {
    let upload = this.blobUrl;
    let formData = new FormData();
    formData.append('file', upload);
    this.loading = true;
    this.http.post(this.SERVER_API_URL + '/speech', "ciao", {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        console.log("bloburl " + this.blobUrl);
        if (events.type == HttpEventType.UploadProgress) {
          this.progress = Math.round(events.loaded / events.total * 100);
        } else if (events.type === HttpEventType.Response) {
          this.progress = 0;
          let res = events.body;
          console.log(res);
          this.loading = false;
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

      //this.readAudio();
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  prova(): void {
    console.log("stop rec " + this.blobUrl);
    this.readAudio();
  }

}
