import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConsts} from './AppConsts';
import { Observable } from '../../../node_modules/rxjs/Observable';

@Injectable()
export class QuizMasterService {
  serverUrl = AppConsts.serverUrl;
  constructor(private _http: HttpClient) { }

  getQuestions(): Observable<Questions> {
    return this._http.get<Questions>(this.serverUrl + 'questions');
  }

  addQuestion(Question: Questions) {
    return this._http.post(this.serverUrl + 'questions', Question);
  }
}

export class Questions {
  question:  string;
  options: Array<any>;
  answerOption: string;
  answerValue: string;
}
