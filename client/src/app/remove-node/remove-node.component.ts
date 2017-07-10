import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Node} from '../models/node.model';
import {ActionPopupComponent} from '../action-popup/action-popup.component';


@Component({
  selector: 'app-remove-node',
  templateUrl: './remove-node.component.html',
  styleUrls: ['./remove-node.component.css']
})
export class RemoveNodeComponent extends ActionPopupComponent implements OnInit {

  @Input() node: Node;
  @Output() sumbit = new EventEmitter<string>();
  @Output() addedNode = new EventEmitter<Node>();

  ngOnInit(): void {
  }

  remove() {
    console.log(`Remove node: ${JSON.stringify(this.node)}`);
    this.api.remove(this.node.id).then(node => {
    });
    this.sumbit.emit('');
    this.close();
  }

  onSubmit() {

  }

}
