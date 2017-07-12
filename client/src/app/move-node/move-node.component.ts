import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NodeComponent} from '../node/node.component';
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {Message} from '../models/message.model';
import {MessageType} from '../models/message-type.model';

@Component({
  selector: 'app-move-node',
  templateUrl: './move-node.component.html',
  styleUrls: ['./move-node.component.css']
})
export class MoveNodeComponent extends ActionPopupComponent implements OnInit {
  @Input() srcNode: NodeComponent;
  @Input() destNode: NodeComponent;
  @Output() featureChanged = new EventEmitter<string>();
  @Output() messageChanged = new EventEmitter<Message>();


  ngOnInit() {
  }


  move() {
    this.api.move(this.srcNode.node.id, this.destNode.node.id).then(
      result => {
        this.srcNode.parentComponent.refresh();
        this.srcNode.root().find(this.destNode.node).refresh();
        this.close();
        const message = new Message('Node successfully moved!',
          `Node with name ${result.content.name} was moved to ${this.destNode.node.content.name}`,
          MessageType.POSITIVE);
        message.timeout = 3000;
        this.messageChanged.emit(message);
      }
    ).catch(err => {
      this.messageChanged.emit(this.messageFromError('', err));
    });
  }
}
