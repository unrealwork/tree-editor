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
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {NodeComponent} from '../node/node.component';
import {Message} from '../models/message.model';
import {MessageType} from '../models/message-type.model';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent implements OnInit, AfterViewInit {
  @Output() featureChanged = new EventEmitter<string>();
  @Output() messageChanged = new EventEmitter<Message>();
  @Input() nodeComponent: NodeComponent;
  @Input() header;
  @ViewChild(ActionPopupComponent) popup;
  description: Description = new Description('');


  ngOnInit(): void {
  }

  constructor(private api: ApiService) {
  }

  ngAfterViewInit(): void {
    this.description = new Description('');
  }

  addChild(content: string) {
    const desc = new Description(content);
    this.api.addChild(this.nodeComponent.node.id, desc).then(node => {
      this.nodeComponent.node.children.push(node);
      if (this.nodeComponent.node.terminal) {
        this.nodeComponent.node.terminal = false;
      }
      if (!this.nodeComponent.isOpen) {
        this.nodeComponent.isOpen = true;
      }
      this.popup.close();
      this.description = new Description('');

      const message = new Message('Node successfully created!',
        `Node ${node.content.name} was created`,
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
