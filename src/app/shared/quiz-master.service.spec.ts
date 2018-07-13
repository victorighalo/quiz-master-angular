import { TestBed, inject } from '@angular/core/testing';

import { QuizMasterService } from './quiz-master.service';

describe('QuizMasterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizMasterService]
    });
  });

  it('should be created', inject([QuizMasterService], (service: QuizMasterService) => {
    expect(service).toBeTruthy();
  }));
});
