import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsComponent } from './questions/questions.component';
import { ResultsComponent } from './results/results.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path : '', component: HomeComponent},
  { path: 'questions', component: QuestionsComponent},
  { path: 'results', component: ResultsComponent}
];
@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
 }
