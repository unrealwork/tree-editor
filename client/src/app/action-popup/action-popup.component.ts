import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../services/api.service';
import {NodeComponent} from '../node/node.component';
import {Message} from '../models/message.model';
import {MessageType} from '../models/message-type.model';

@Component({
  selector: 'app-action-popup',
  templateUrl: './action-popup.component.html',
  styleUrls: ['./action-popup.component.css']
})
export class ActionPopupComponent implements OnInit {
  @Input() nodeComponent: NodeComponent;
  @Input() header: string;
  @Output() featureChanged = new EventEmitter<string>();
  @Output() messageChanged = new EventEmitter<Message>();

  constructor(protected api: ApiService) {
  }

  close() {
    console.log('changed');
    this.featureChanged.emit('');
  }

  ngOnInit() {
  }

  messageFromError(header: string, err: any) {
    if (err.status % 100 === 5) {
      return new Message('Unexpected error', 'Internal server error', MessageType.NEGATIVE);
    } else {
      return new Message('Incorrect action', JSON.parse(err._body).message, MessageType.NEGATIVE);
    }
  }
}
