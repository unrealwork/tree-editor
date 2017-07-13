import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {NodeComponent} from '../node/node.component';
import {Message} from 'app/models/message.model';
import {MessageType} from '../models/message-type.model';
import {ApiService} from '../services/api.service';


@Component({
  selector: 'app-remove-node',
  templateUrl: './remove-node.component.html',
  styleUrls: ['./remove-node.component.css']
})
export class RemoveNodeComponent implements OnInit {
  @Output() featureChanged = new EventEmitter<string>();
  @Output() messageChanged = new EventEmitter<Message>();
  @Input() nodeComponent: NodeComponent;
  @Input() header;
  @ViewChild(ActionPopupComponent) popup;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

  remove() {
    this.api.remove(this.nodeComponent.node.id).then(node => {
      this.popup.close();
      this.nodeComponent.refresh();
      const message = new Message('Node successfully removed!',
        `Node with name ${node.content.name} was removed`,
        MessageType.POSITIVE);
      message.timeout = 3000;
      this.messageChanged.emit(message);
    }).catch(err => {
      this.messageChanged.emit(Message.fromError(err));
    });
  }

  onSubmit() {

  }

}
