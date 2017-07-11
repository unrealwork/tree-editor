import {Component, Input, OnInit} from '@angular/core';
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

  ngOnInit() {
  }


  move() {
    this.destNode.refresh();
    this.api.move(this.srcNode.node.id, this.destNode.node.id).then(
      result => {
        this.srcNode.refresh();
        this.destNode.refresh();
        this.destNode = null;
        this.close();
      }
    );
  }
}
