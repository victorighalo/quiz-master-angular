import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConsts} from './AppConsts';

@Injectable()
export class QuizMasterService {
  serverUrl = AppConsts.serverUrl;
  constructor(private _http: HttpClient) { }

  getQuestions() {
    return this._http.get(this.serverUrl + 'questions');
  }
}
