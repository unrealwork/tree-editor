import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Description} from '../models/description.model';
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {Node} from '../models/node.model';

@Component({
  selector: 'app-edit-node',
  templateUrl: './edit-node.component.html',
  styleUrls: ['./edit-node.component.css']
})
export class EditNodeComponent extends ActionPopupComponent implements OnInit, AfterViewInit {
  @Output() addedNode = new EventEmitter<Node>();
  @Output() featureChanged = new EventEmitter<string>();
  description: Description = new Description('');
  @Input() node: Node;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.description = new Description('');
  }

  addChild(content: string) {
    const desc = new Description(content);
    this.api.update(this.node.id, desc).then(node => {
      this.addedNode.emit(node);
    });
    this.description = new Description('');
    this.close();
  }

  onSubmit() {
  }
}
