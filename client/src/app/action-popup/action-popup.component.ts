import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Node} from '../models/node.model';

@Component({
  selector: 'app-action-popup',
  templateUrl: './action-popup.component.html',
  styleUrls: ['./action-popup.component.css']
})
export class ActionPopupComponent implements OnInit {
  @Input() node: Node;
  @Input() header: string;
  @Output() featureChanged = new EventEmitter<string>();

  constructor(protected api: ApiService) {
  }

  close() {
    console.log('Close and emit');
    this.featureChanged.emit('');
  }

  ngOnInit() {
  }
}
