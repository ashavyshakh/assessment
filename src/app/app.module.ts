import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { QuestionsComponent } from './questions/questions.component';
import { ResultsComponent } from './results/results.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { QuestionService } from './services/question-service';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { SharedService } from './services/shared-service';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    ResultsComponent,
    HomeComponent,
    ModalComponent
  ],
  entryComponents : [ModalComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    HighchartsChartModule
  ],
  providers: [QuestionService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
