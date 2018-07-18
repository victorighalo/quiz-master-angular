import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QuizMasterService } from './quiz-master.service';
import { TopnavbarComponent } from './layout/topnavbar/topnavbar.component';
import { UiModalDirective } from './layout/modal/modal.component';
@NgModule({
  imports: [ ],
  exports: [
    TopnavbarComponent,
    FormsModule,
    ReactiveFormsModule,
    UiModalDirective
  ],
  declarations: [TopnavbarComponent, UiModalDirective]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        QuizMasterService
       ]
    };
  }
}
