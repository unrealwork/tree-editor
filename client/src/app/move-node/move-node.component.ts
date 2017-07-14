import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {NodeComponent} from '../node/node.component';
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {Message} from '../models/message.model';
import {MessageType} from '../models/message-type.model';

@Component({
  selector: 'app-move-node',
  templateUrl: './move-node.component.html',
  styleUrls: ['./move-node.component.css']
})
export class MoveNodeComponent extends ActionPopupComponent implements OnInit, AfterViewInit {
  @Input() srcNode: NodeComponent;
  @ViewChild('dest') destNode = null;
  @Output() featureChanged = new EventEmitter<string>();
  @Output() messageChanged = new EventEmitter<Message>();
  @Input() header;
  @ViewChild(ActionPopupComponent) popup;

  ngAfterViewInit() {
    // this.destNode.collapseAll();
  }

  move() {
    this.api.move(this.srcNode.node.id, this.destNode.node.id).then(
      result => {
        this.srcNode.root().refresh();
        this.popup.close();
        const message = new Message('Node successfully moved!',
          `Node with name ${result.content.name} was moved to ${this.destNode.node.content.name}`,
          MessageType.POSITIVE);
        message.timeout = 3000;
        this.messageChanged.emit(message);
      }
    ).catch(err => {
      this.messageChanged.emit(Message.fromError(err));
    });
  }

  onNavigateNode(node: NodeComponent) {
    this.destNode = node;
  }
}
