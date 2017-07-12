import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Node} from '../models/node.model';
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {NodeComponent} from '../node/node.component';
import {Message} from 'app/models/message.model';
import {MessageType} from '../models/message-type.model';


@Component({
  selector: 'app-remove-node',
  templateUrl: './remove-node.component.html',
  styleUrls: ['./remove-node.component.css']
})
export class RemoveNodeComponent extends ActionPopupComponent implements OnInit {
  @Output() featureChanged = new EventEmitter<string>();
  @Input() nodeComponent: NodeComponent;
  @Output() messageChanged = new EventEmitter<Message>();
  @Output() addedNode = new EventEmitter<Node>();

  ngOnInit(): void {
  }

  remove() {
    this.api.remove(this.nodeComponent.node.id).then(node => {
      this.close();
      this.nodeComponent.refresh();
      const message = new Message('Node successfully removed!',
        `Node with name ${node.content.name} was removed`,
        MessageType.POSITIVE);
      message.timeout = 3000;
      this.messageChanged.emit(message);
    }).catch(err => {
      this.messageChanged.emit(this.messageFromError('', err));
    });
  }

  onSubmit() {

  }

}
