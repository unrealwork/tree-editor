import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../services/api.service';
import {NodeComponent} from '../node/node.component';
import {Message} from '../models/message.model';

@Component({
  selector: 'app-action-popup',
  templateUrl: './action-popup.component.html',
  styleUrls: ['./action-popup.component.css']
})
export class ActionPopupComponent implements OnInit {
  @Input() nodeComponent: NodeComponent;
  @Input() header: string;
  @Input() featureChanged;
  @Output() messageChanged = new EventEmitter<Message>();


  constructor(protected api: ApiService) {
  }

  close() {
    this.featureChanged.emit('');
  }

  ngOnInit() {
  }
}
