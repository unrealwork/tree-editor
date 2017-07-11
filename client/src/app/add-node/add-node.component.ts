import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Description} from '../models/description.model';
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {NodeComponent} from '../node/node.component';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent extends ActionPopupComponent implements OnInit, AfterViewInit {
  @Output() featureChanged = new EventEmitter<string>();
  description: Description = new Description('');
  @Input() nodeComponent: NodeComponent;

  ngOnInit(): void {
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
      this.close();
      this.description = new Description('');
    });
  }

  onSubmit() {
  }
}
