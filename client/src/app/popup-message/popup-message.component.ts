import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../models/message.model';

@Component({
  selector: 'app-popup-message',
  templateUrl: './popup-message.component.html',
  styleUrls: ['./popup-message.component.css']
})
export class PopupMessageComponent implements OnInit {
  @Input()
  get message(): Message {
    return this._message;
  }

  set message(value: Message) {
    this._message = value;
    this.isShowed = true;
    const timeout = value.timeout;
    if (timeout > 0) {
      this.isShowed = true;
      setTimeout(() => {
        this.isShowed = false;
      }, timeout);
    }
  }

  isShowed = true;
  private _message: Message;

  constructor() {
  }

  ngOnInit() {
  }

  close() {
    this.isShowed = false;
  }
}
