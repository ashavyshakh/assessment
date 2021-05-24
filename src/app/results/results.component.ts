import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared-service';
import { Subscription } from 'rxjs';
import * as  Highcharts from 'highcharts';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);
// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  resultsSub: Subscription;
  results: any = [];
  correctAnswers = [];
  inCorrectAnswers = [];
  skippedQuestions = [];
  pieData: any = [];
  skippedDrilldown: any = [];
  answeredDrilldown: any = [];
  genCorrect: any = [];
  apptitudeCorrect: any = [];
  reasoningCorrect: any = [];
  numCorrect: any = [];
  genInCorrect: any = [];
  apptitudeInCorrect: any = [];
  reasoningInCorrect: any = [];
  numInCorrect: any = [];


  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.resultsSub = this.sharedService.getResult().subscribe(results => {
      if (results !== null) {
        this.results = results.results;
        this.skippedQuestions = results.skipped;
        this.answerValidation(this.results);
      }
    });

  }
  answerValidation(results: any) {
    this.genCorrect = [];
    this.apptitudeCorrect = [];
    this.reasoningCorrect = [];
    this.numCorrect = [];
    this.genInCorrect = [];
    this.apptitudeInCorrect = [];
    this.reasoningInCorrect = [];
    this.numInCorrect = [];
    this.correctAnswers = [];
    this.inCorrectAnswers = [];
    results.forEach(element => {
      if (element.questionType === 'radio') {
        const ans = element.options.find(option => option.isAnswer === true);
        if (ans.id === element.selectedAnswer) {
          this.correctAnswers.push(element);
          if (element.category === 'general-knowledge') {
            this.genCorrect.push(element);
          } else if (element.category === 'aptitude') {
            this.apptitudeCorrect.push (element);
          } else if (element.category === 'reasoning') {
            this.reasoningCorrect.push (element);
          } else if (element.category === 'numerical-ability') {
            this.numCorrect.push (element);
          }
        } else {
          this.inCorrectAnswers.push(element);
          if (element.category === 'general-knowledge') {
            this.genInCorrect.push(element);
          } else if (element.category === 'aptitude') {
            this.apptitudeInCorrect.push (element);
          } else if (element.category === 'reasoning') {
            this.reasoningInCorrect.push (element);
          } else if (element.category === 'numerical-ability') {
            this.numInCorrect.push (element);
          }
        }

      } else {
      const answerArray =  element.options.filter(item => item.isAnswer === true);
      if (answerArray.length > 0) {
        if (element.selectedAnswer.length > 0) {
          const selectedAns = element.selectedAnswer;
          if (selectedAns.every(v => answerArray.includes(v))) {
            this.correctAnswers.push(element);
            if (element.category === 'general-knowledge') {
              this.genCorrect.push(element);
            } else if (element.category === 'aptitude') {
              this.apptitudeCorrect.push (element);
            } else if (element.category === 'reasoning') {
              this.reasoningCorrect.push (element);
            } else if (element.category === 'numerical-ability') {
              this.numCorrect.push (element);
            }
          } else {
            this.inCorrectAnswers.push(element);
            if (element.category === 'general-knowledge') {
              this.genInCorrect.push(element);
            } else if (element.category === 'aptitude') {
              this.apptitudeInCorrect.push (element);
            } else if (element.category === 'reasoning') {
              this.reasoningInCorrect.push (element);
            } else if (element.category === 'numerical-ability') {
              this.numInCorrect.push (element);
            }
          }
        }
      }
      }
    });

    this.getPiechartData();
  }

  getPiechartData(): any {
    this.pieData = [];
    this.pieData = [
      {
        name: 'Skipped',
        y: this.skippedQuestions.length,
        drilldown: 'Skipped'
      },
      {
        name: 'Answered',
        y: this.results.length,
        drilldown: 'Answered'
      },
    ];
    this.loadPieChart();

}
  loadPieChart() {
    const drillObj = {
      name : '',
      id : '',
      data : ''
    };
    const categoryObj = {
      name : '',
      id : '',
      data : ''
    };
    const skippedAptitudeDrilldown = [];
    const skippedGeneralDrilldown = [];
    const skippedResoningDrilldown = [];
    const skippedNumericDrilldown = [];
    this.skippedQuestions.forEach(item => {
      drillObj.name = item.category;
      drillObj.id = item.category;
      if (item.category === 'general-knowledge') {
        skippedGeneralDrilldown.push(item);
      } else if (item.category === 'aptitude') {
        skippedAptitudeDrilldown.push(item);
      } else if (item.category === 'reasoning') {
        skippedResoningDrilldown.push(item);
      } else if (item.category === 'numerical-ability') {
        skippedNumericDrilldown.push(item);
       }
    });
    const answeredAptitudeDrilldown = [];
    const answeredGeneralDrilldown = [];
    const answeredResoningDrilldown = [];
    const answeredNumericDrilldown = [];

    this.results.forEach(item => {
      drillObj.name = item.category;
      drillObj.id = item.category;
      if (item.category === 'general-knowledge') {
        answeredGeneralDrilldown.push(item);
      } else if (item.category === 'aptitude') {
        answeredAptitudeDrilldown.push(item);
      } else if (item.category === 'reasoning') {
        answeredResoningDrilldown.push(item);
      } else if (item.category === 'numerical-ability') {
        answeredNumericDrilldown.push(item);
       }
    });


    Highcharts.chart('container', {
      chart: {
        type: 'pie'
      },
      series: [{
        name: 'Results',
        type: undefined,
        colorByPoint: true,
        data: this.pieData
      }],
      drilldown: {
        series: [
          {
            name: 'Skipped',
            type: undefined,
            id: 'Skipped',
            data: [{
                name: 'General Knowledge',
                y: skippedGeneralDrilldown.length
              },
              {
                name: 'Resoning',
                y: skippedResoningDrilldown.length
              },
              {
                name: 'Aptitude',
                y: skippedAptitudeDrilldown.length
              },
              {
                name: 'Numerical Ability',
                y: skippedNumericDrilldown.length
              }
            ]
          },
          {
            name: 'Answered',
            type: undefined,
            id: 'Answered',
            data: [{
              name: 'General Knowledge',
              y: answeredGeneralDrilldown.length,
              drilldown: 'General Knowledge'
            },
            {
              name: 'Resoning',
              y: answeredResoningDrilldown.length,
              drilldown: 'Resoning'
            },
            {
              name: 'Aptitude',
              y: answeredAptitudeDrilldown.length,
              drilldown: 'Aptitude'
            },
            {
              name: 'Numerical Ability',
              y: answeredNumericDrilldown.length,
              drilldown: 'Numerical Ability'
            }
          ]
          },
          {
            name: 'Resoning',
            type: undefined,
            id: 'Resoning',
            data: [{
                name: 'Correct',
                y: this.reasoningCorrect.length,
                color: 'red'
              },
              {
                name: 'Incorrect',
                y: this.reasoningInCorrect.length,
                color: 'blue'
              }
            ]
          },
          {
            name: 'Aptitude',
            id: 'Aptitude',
            type: undefined,
            data: [{
                name: 'correct',
                y: this.apptitudeCorrect.length,
                color: 'green'
              },
              {
                name: 'Incorrect',
                y: this.apptitudeInCorrect.length,
                color: 'yellow'
              }
            ]
          },
          {
            name: 'Numerical Ability',
            id: 'Numerical Ability',
            type: undefined,
            data: [{
                name: 'correct',
                y: this.numCorrect.length,
                color: 'green'
              },
              {
                name: 'Incorrect',
                y: this.numInCorrect.length,
                color: 'yellow'
              }
            ]
          },
          {
            name: 'General Knowledge',
            id: 'General Knowledge',
            type : undefined,
            data: [{
                name: 'correct',
                y: this.genCorrect.length,
                color: 'green'
              },
              {
                name: 'Incorrect',
                y: this.genInCorrect.length,
                color: 'yellow'
              }
            ]
          }
        ],
      }
    });
  }

}
