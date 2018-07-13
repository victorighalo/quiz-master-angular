import { Component, OnInit } from '@angular/core';
import { QuizMasterService } from '../../shared/quiz-master.service';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  // candidate = 0,
  // quiz = 0,
  // question = 0,
  // choice = '',
  // choices = [],
  // choiceA = 0,
  // choiceB = 0,
  // choiceC = 0,
  // choiceD = 0,
  // correct = 0,
  constructor(private _quizMasterService: QuizMasterService) { }
  calculatedResult = {
    totalCorrectAnswers: null,
    totalQuestionsAnswered: null
  };
  currentQuestion: any;
  position = 1;
  answers: any[] = [];
  questions: any = [];
  questionsOld: any = [
    {
    index: 1,
    question: 'What is 10 + 4?',
    options: ['14', '8', '42', '88'],
    answerOption: 'A',
    answerValue: '14'
    },
    {
      index: 2,
      question: 'How old is Nigeria?',
      options: ['120', '90', '12', '58'],
      answerOption: 'D',
      answerValue: '58'
    },
    {
      index: 3,
      question: 'How many states are in Nigeria?',
      options: ['14', '36', '42', '88'],
      answerOption: 'B',
      answerValue: '36'
    },
    {
      index: 4,
      question: 'Who is the Founder of Facebook?',
      options: ['Victor Zuker', 'Obinna Collins', 'Mark Zukerberg', 'Oluwatobi Adamu'],
      answerOption: 'C',
      answerValue: 'Mark Zukerberg'
    }
  ];


  submitAnswer(answer): void {
    if (this.questions.length <= this.position ) {
      console.log('Quiz is Over');
      this.calculateQuiz();
      return;
    }
    this.position++;
    this.currentQuestion = this.questions.filter((val) => val.index === this.position);
  }

  trackAnswer(index, answer): void {
    let isAlreadyAnswered = false;
    const userAnswer = this.questions.filter((val) => val.index === index);

    if (this.answers.length > 0) {
    this.answers.map(value => console.log(value, value['chosenOption']));
      isAlreadyAnswered = this.answers.some(value => value.userQuestion[0].index === userAnswer[0]['index'] );
    }
    if (!isAlreadyAnswered) {
    this.answers.push( {userQuestion: userAnswer, chosenOption: answer});
    }

    // console.log(isAlreadyAnswered, '....', this.answers);
  }

  calculateQuiz(): void {
    this.answers.map( (value, i) => {
      if (value.chosenOption === value.userQuestion[0].answerValue) {
        this.calculatedResult.totalCorrectAnswers++;
      }
    } );
    console.log(this.calculatedResult.totalCorrectAnswers)
  }

  ngOnInit() {
    this._quizMasterService.getQuestions().subscribe( (result) => {
      this.questions = result;
      this.currentQuestion = this.questions.filter((val) => val.index === this.position);
      console.log(result);
    });
  }

}
