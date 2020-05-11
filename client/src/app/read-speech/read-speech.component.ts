import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AudioRecordingService } from '../services/audio-recording.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-read-speech',
  templateUrl: './read-speech.component.html',
  styleUrls: ['./read-speech.component.css']
})
export class ReadSpeechComponent implements OnInit, OnDestroy {

  isRecording = false;
  recordedTime;
  blobUrl;

  constructor(public http: HttpClient, private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
    });
  }
  o: Observable<Object>;
  data: any;

  ngOnInit(): void {
   // this.o = this.http.get('https://3000-e1b6f371-04be-4e91-8e2d-1e7328a3ab4d.ws-eu01.gitpod.io/speech');
   // this.o.subscribe(data => { this.data = data; this.popup(this.data.text) });
  }

  popup(data): void {
    let res = data.split(' ');
    var stringa = "Aggiungere voto " + res[3] + " a " + res[6] //La frase deve essere sempre: "Aggiungere il voto <numero> allo studente <persona>"
    var answer = window.confirm(stringa);
    if (answer = true) {
      //AGGIUNGI VOTO
    } else {
      //NON AGGIUNGERE IL VOTO
    }
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
