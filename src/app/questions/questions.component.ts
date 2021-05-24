import { Component, OnInit, ɵConsole } from '@angular/core';
import {QuestionService} from '../services/question-service' ;
import {ModalComponent} from '../modal/modal.component' ;
import {MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SharedService } from '../services/shared-service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
/**
 * author : Asha vyshakh
 * mail id : ashvyshak@gmail.com
 * show question & multiple choices
 * previous / next page navigation
 * submit each question answer
 * option for skipp each question
 */
export class QuestionsComponent implements OnInit {
  public questions: any = [] ;
  public answeredQuestions: any = [] ;
  public skippedQuestions: any = [] ;
  public pageNo: any = 1;
  public currentQuestion: any = null;
  public isNext = false;
  public isCheckBoxChecked = false;
  public showAssessmentSubmit = false;
  public showWarning = false;

  constructor(
    private questionService: QuestionService,
    private sharedService: SharedService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.skippedQuestions = [];
    this.getQuestion();
  }
  getQuestion(): any {
    this.questionService.fetchQuestionsService().subscribe(item => {
      if (item.data) {
        this.questions = item.data;
        this.getQuestionsByPage(this.pageNo);
      }
    }, err => {
      console.log('data not found');
    });
  }
  getQuestionsByPage(pageNo: any): any {
    this.currentQuestion = this.questions.find( x => x.order === pageNo);
  }
  clickPrev(): any {
  this.pageNo--;
  this.getQuestionsByPage(this.pageNo);
  this.isNext = true;
  }
  clickNext(): any {
  if (this.pageNo < this.questions.length) {
  this.pageNo++;
  this.getQuestionsByPage(this.pageNo);
  this.isNext = false;
  } else {
      this.showAssessmentSubmit = true ;
    }
  }
  clickSubmit(currentQuestion: any): any {
    this.answeredQuestions.push(currentQuestion);
    const index = this.skippedQuestions.findIndex(item => item.id === currentQuestion.id);
    if (index > -1) {
      this.skippedQuestions.splice(index, 1);
    }
    this.isNext = true;
    if (this.pageNo === this.questions.length) {
      this.showAssessmentSubmit = true;
    }
  }
  clickSkipp(currentQuestion: any): any {
    if (currentQuestion.questionType === 'radio' && currentQuestion.selectedAnswer === null) {
      this.skippedQuestions.push(currentQuestion);
    }
    if (currentQuestion.questionType === 'multi' && currentQuestion.selectedAnswer.length === 0) {
      this.skippedQuestions.push(currentQuestion);
    }
    if (this.pageNo < this.questions.length) {
    this.pageNo++;
    this.getQuestionsByPage(this.pageNo);
    this.isNext = false;
  } else {
    this.showAssessmentSubmit = true ;
  }
  }
  selectCheckEvent(item: any): any {
  this.isCheckBoxChecked = true;
  if (item.checked) {
    this.currentQuestion.selectedAnswer.push(item);
  } else {
    this.currentQuestion.selectedAnswer.pop(item);
  }
  }
  clickSubmitAssessment(): any {
    this.checkSkippedQuestions();
  }
  checkSkippedQuestions(): any {
    if (this.skippedQuestions.length > 0) {
      const dialogRef = this.dialog.open(ModalComponent, {
        data: {
          message: 'You have skipped' + ' ' + this.skippedQuestions.length + ' ' + 'questions. Do you want to re-visit?',
          buttonText: {
            yes: 'Yes',
            cancel: 'No'
          }
        }
      });
      dialogRef.afterClosed().subscribe((confirmed: any) => {
        if (confirmed === 'yes') {
          this.showAssessmentSubmit = false;
         // this.questions = this.questions.filter(item => item.selectedAnswer === null);
          this.pageNo = 1;
        } else if (confirmed === 'no') {
          const obj = {
            results : this.answeredQuestions,
            skipped : this.skippedQuestions
          };
          this.sharedService.setResult(obj);
          this.showAssessmentSubmit = false;
          this.router.navigate([`results`]);
        }
      });
    } else {
      const obj = {
        results : this.answeredQuestions,
        skipped : this.skippedQuestions
      };
      this.sharedService.setResult(obj);
      this.showAssessmentSubmit = false;
      this.router.navigate([`results`]);
    }
  }

}
