import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Description} from '../models/description.model';
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {Node} from '../models/node.model';
import {NodeComponent} from '../node/node.component';
import {NodePathComponent} from '../node-path/node-path.component';
import {Message} from '../models/message.model';
import {MessageType} from '../models/message-type.model';

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css']
})
export class EditNodeComponent extends ActionPopupComponent implements OnInit, AfterViewInit {
  @Output() addedNode = new EventEmitter<Node>();
  @Output() featureChanged = new EventEmitter<string>();
  description: Description = new Description('');
  @Input() nodeComponent: NodeComponent;
  @Input() pathComponent: NodePathComponent;
  @Output() messageChanged = new EventEmitter<Message>();

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.description = new Description('');
  }

  addChild(content: string) {
    const desc = new Description(content);
    this.api.update(this.nodeComponent.node.id, desc).then(node => {
      this.nodeComponent.node.content = node.content;
      this.pathComponent.refresh();
      this.close();
      this.description = new Description('');
      const message = new Message('Node name successfuly changed!',
        `Node has new name ${node.content.name}`,
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
