import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Node} from '../models/node.model';
import {ActionPopupComponent} from '../action-popup/action-popup.component';
import {NodeComponent} from '../node/node.component';


@Component({
  selector: 'app-remove-node',
  templateUrl: './remove-node.component.html',
  styleUrls: ['./remove-node.component.css']
})
export class RemoveNodeComponent extends ActionPopupComponent implements OnInit {
  @Output() featureChanged = new EventEmitter<string>();
  @Input() nodeComponent: NodeComponent;
  @Output() addedNode = new EventEmitter<Node>();

  ngOnInit(): void {
  }

  remove() {
    this.api.remove(this.nodeComponent.node.id).then(node => {
      this.close();
      this.nodeComponent.refresh();
    });
  }

  onSubmit() {

  }

}
