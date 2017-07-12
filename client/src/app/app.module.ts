import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NodeComponent} from './node/node.component';
import {FillPipe} from './fill.pipe';
import {AddNodeComponent} from './add-node/add-node.component';
import {ApiService} from './services/api.service';
import {HeaderComponent} from './header/header.component';
import {EditNodeComponent} from './edit-node/edit-node.component';
import {RemoveNodeComponent} from './remove-node/remove-node.component';
import {ActionPopupComponent} from './action-popup/action-popup.component';
import {NodePathComponent} from './node-path/node-path.component';
import {MoveNodeComponent} from './move-node/move-node.component';
import {PopupMessageComponent} from './popup-message/popup-message.component';

@NgModule({
  declarations: [
    AppComponent,
    NodeComponent,
    AddNodeComponent,
    HeaderComponent,
    FillPipe,
    EditNodeComponent,
    EditNodeComponent,
    RemoveNodeComponent,
    ActionPopupComponent,
    NodePathComponent,
    MoveNodeComponent,
    PopupMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
