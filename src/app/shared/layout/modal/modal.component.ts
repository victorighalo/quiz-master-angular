import { Component, OnInit, Output, EventEmitter, Directive, ElementRef  } from '@angular/core';

declare var UIkit: any;

@Directive({
  selector: '[appUiModal]'
})
export class UiModalDirective implements OnInit {

  constructor(private el: ElementRef) { }

  @Output() submitQuizAction: EventEmitter<string> = new EventEmitter<string>();

  showAlert(): void {
    console.log(this.submitQuizAction.emit())
    const self = this;
    UIkit.modal.confirm('<p>Submit Quiz</p>').then(function () {
      self.submitAction('44');
    }, function () {
      self.submitAction('22');
    });
  }

  submitAction(response: string): void {
    const self = this;
    this.submitQuizAction.emit(response);
    console.log(this.submitQuizAction.emit("erer"))
    if (response) { self.submitQuizAction.emit(response); }else {
      self.submitQuizAction.emit(response); }
  }
  ngOnInit() {
    console.log(this.submitQuizAction.emit())
  }
  

}
 