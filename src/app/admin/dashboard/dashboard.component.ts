import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Questions, QuizMasterService } from '../../shared/quiz-master.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private _quizMasterService: QuizMasterService) { }

  addQuestionForm: FormGroup;
  question: FormControl;
  option: FormControl;
  options: Array<any> = [];

  answerOption: string;
  answerValue: string;

  createFormControls(): void {
    this.question = new FormControl('', Validators.required);
    this.option = new FormControl('', Validators.required);
  }

  createForm(): void {
    this.addQuestionForm = new FormGroup({
      question: this.question,
      option: this.option
    });
  }

  addOption(): void {
    if (true) {
    this.options.push({value: this.option.value, answer: false});
    this.option.reset();
    }
  }

  markAnswer(index, option): void {
    if (this.clearAnswers()) {
   this.options.map((value, i) => {
      if (i === index) {
        this.answerOption = i.toString();
        this.answerValue = value.value;
        this.options.map( object => {
          if (object.value === option) {
            object.answer = true;
          }
        });
        return;
      }
    });
}
  }

clearAnswers(): boolean {
  this.options.map(object => {
      object.answer = false;
  });
  return true;
}

  removeOption(index): void {
    this.options.map( (value, i) => {
      if (i === index) {
        this.options.splice(i, 1);
        return;
      }
    } );
  }

  saveQuestion(): any {
    const questionsObject: Questions = new Questions();
    questionsObject.question = this.question.value;
    questionsObject.options = this.options;
    questionsObject.answerOption = this.answerOption;
    questionsObject.answerValue = this.answerValue;
    
    this._quizMasterService.addQuestion(questionsObject).subscribe( (result) => {
      console.log(result);
    });
  }

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

}
