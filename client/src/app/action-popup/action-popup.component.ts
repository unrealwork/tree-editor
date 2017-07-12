import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../services/api.service';
import {NodeComponent} from '../node/node.component';

@Component({
  selector: 'app-action-popup',
  templateUrl: './action-popup.component.html',
  styleUrls: ['./action-popup.component.css']
})
export class ActionPopupComponent implements OnInit {
  @Input() nodeComponent: NodeComponent;
  @Input() header: string;
  @Output() featureChanged = new EventEmitter<string>();

  constructor(protected api: ApiService) {
  }

  close() {
    console.log('changed');
    this.featureChanged.emit('');
  }

  ngOnInit() {
  }
}