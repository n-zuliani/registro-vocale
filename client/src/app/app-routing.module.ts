import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadSpeechComponent } from './read-speech/read-speech.component';
import { TableComponent } from './table/table.component';
const routes: Routes = [
  { path: 'table', component: TableComponent },
  { path: 'read-speech', component: ReadSpeechComponent },
  { path: '', redirectTo: '/read-speech', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
