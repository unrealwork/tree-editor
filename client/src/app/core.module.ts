import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from './services/api.service';
import {SelectionService} from './services/selection.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [ // components that we want to make available
  ],
  declarations: [ // components for use in THIS module
  ],
  providers: [ // singleton services
    ApiService, SelectionService
  ]
})
export class CoreModule {
}
