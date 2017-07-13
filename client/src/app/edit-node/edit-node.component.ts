import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Description} from '../models/description.model';
import {NodeComponent} from '../node/node.component';
import {NodePathComponent} from '../node-path/node-path.component';
import {Message} from '../models/message.model';
import {MessageType} from '../models/message-type.model';
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css']
})
export class EditNodeComponent implements OnInit, AfterViewInit {
  @Input() @Output() featureChanged = new EventEmitter<string>();
  @Input() nodeComponent: NodeComponent;
  @Input() pathComponent: NodePathComponent;
  @Output() messageChanged = new EventEmitter<Message>();
  @Input() header;
  @ViewChild(ActionPopupComponent) popup;
  description: Description = new Description('');

  constructor(private api: ApiService) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.description = new Description('');
  }

  update(content: string) {
    const desc = new Description(content);
    this.api.update(this.nodeComponent.node.id, desc).then(node => {
      this.nodeComponent.node.content = node.content;
      this.description = new Description('');
      const message = new Message('Node name successfuly changed!',
        `Node has new name ${node.content.name}`,
        MessageType.POSITIVE);
      message.timeout = 3000;
      this.messageChanged.emit(message);
      this.pathComponent.refresh();
      this.popup.close();
    }).catch(err => {
      this.messageChanged.emit(Message.fromError(err));
    });
  }

  onSubmit() {
  }
}
