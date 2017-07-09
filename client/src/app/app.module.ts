import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NodeComponent} from './node/node.component';
import {FillPipe} from './fill.pipe';
import {CoreModule} from './core.module';
import {ControlPanelComponent} from './control-panel/controlPanel.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    ControlPanelComponent,
    FillPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
