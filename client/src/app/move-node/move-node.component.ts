import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NodeComponent} from '../node/node.component';
import {ActionPopupComponent} from '../action-popup/action-popup.component';

@Component({
  selector: 'app-move-node',
  templateUrl: './move-node.component.html',
  styleUrls: ['./move-node.component.css']
})
export class MoveNodeComponent extends ActionPopupComponent implements OnInit {
  @Input() srcNode: NodeComponent;
  @Input() destNode: NodeComponent;
  @Output() featureChanged = new EventEmitter<string>();


  ngOnInit() {
  }


  move() {
    this.api.move(this.srcNode.node.id, this.destNode.node.id).then(
      result => {
        this.srcNode.parentComponent.refresh();
        this.srcNode.root().find(this.destNode.node).refresh();
        this.close();
      }
    );
  }
}
