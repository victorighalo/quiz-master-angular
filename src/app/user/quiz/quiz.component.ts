import { Component, OnInit, ViewChild } from '@angular/core';
import { QuizMasterService } from '../../shared/quiz-master.service';
import { UiModalDirective } from '../../shared/layout/modal/modal.component';

declare var UIkit: any;
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private _quizMasterService: QuizMasterService) { }

  @ViewChild(UiModalDirective) modal: UiModalDirective;

  calculatedResult = {
    totalCorrectAnswers: null,
    totalQuestionsAnswered: null
  };

  currentQuestion: any;
  position = 0;
  answers: any[] = [];
  questions: any = [];

  submitAnswer(answer): void {
    console.log(this.questions.length, this.position)
    if (this.questions.length <= this.position + 1 ) {
      console.log('Quiz is Over');
      this.calculateQuiz();
      return;
    }
    this.position++;
    this.currentQuestion = this.questions.filter((val, index) => index === this.position);
  }

  // Temporarily record users ansers
  trackAnswer(questionId, answer): void {
    let isAlreadyAnswered = false;

    // get the currently active question selected as an answer by the user
    let activeQuestion = this.questions.filter((val, index) => val._id === questionId);

    // check if there are submitted answers already in the array before operation
    if (this.answers.length > 0) {
      // this.answers.map(value => console.log(value.userAnsweredQuestion[0]._id));

    // check if the selected option is already answer
       this.answers.forEach((answers, answerIndex) => {
        //  check if the active question is already answered
        // then update the chosenOption
        if (answers.userAnsweredQuestion[0]._id === activeQuestion[0]._id) {
          answers.chosenOption = answer;
          isAlreadyAnswered = true;
        }
      }
      );
    }
    if (!isAlreadyAnswered) {
    this.answers.push( {userAnsweredQuestion: activeQuestion, chosenOption: answer});
    }

    console.log(isAlreadyAnswered, '....', this.answers);
  }

  calculateQuiz(): void {
    this.answers.map( (value, i) => {
      if (value.chosenOption === value.userAnsweredQuestion[0].answerValue) {
        this.calculatedResult.totalCorrectAnswers++;
      }
    } );
    console.log(this.calculatedResult.totalCorrectAnswers)
  }

  showModal(): void {
    this.modal.showAlert();
  }

  submitQuiz(event) {
    console.log('event');
  }

  ngOnInit() {
    this._quizMasterService.getQuestions().subscribe( (result) => {
      this.questions = result;
      this.currentQuestion = this.questions.filter((val, index) => index === this.position);
      console.log(result);
    });
  }

}
