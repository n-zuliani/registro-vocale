# Registro Vocale
Permette di inserire valutazioni e voti per interventi e risposte degli studenti e memorizzarli su un DataBase.

&nbsp;   &nbsp;   &nbsp;   &nbsp;   &nbsp;
## Setup
### Nella cartella server
- caricare il file ```real-time-eval-1a7031beb2bd.json``` contenente la API key
- eseguire il comando ```gp env GOOGLE_APPLICATION_CREDENTIALS="/workspace/registro-vocale/server/real-time-eval-1a7031beb2bd.json"```
- eseguire il comando ```eval $(gp env -e)```
- installare la libreria Google Cloud Speech ```npm install --save @google-cloud/speech```
### Nella cartella client
- installare Angular CLI ```npm i @angular/cli -g```
- installare moduli node ```npm i```
- installare libreria cors ```npm i cors```

&nbsp;   &nbsp;   &nbsp;   &nbsp;   &nbsp;  
## Per utilizzarlo
- far partire il server node ```npm start```
- copiare l'URL del server nel formato ```https://xxx.gitpod.io``` nei file ```read-speech-component.ts``` e ```table.component.ts```
- far partire il client con i comandi
```bash
cd /workspace/registro-vocale/client
ng serve --disableHostCheck
```

Ora l'applicazione può essere usata

Suggerimento: gli studenti presenti nel DataBase sono Mario Rossi, Luigi Bianchi e Alberto Verdi.
