import {Component, Input} from '@angular/core';
import {Node} from '../models/node.model';
import {ApiService} from '../services/api.service';
import {NodeComponent} from '../node/node.component';

@Component({
  selector: 'app-node-path',
  templateUrl: './node-path.component.html',
  styleUrls: ['./node-path.component.css']
})
export class NodePathComponent {
  path: Array<Node> = [];
  private _node: NodeComponent;

  @Input()
  get node(): NodeComponent {
    return this._node;
  }


  set node(node: NodeComponent) {
    if (node && node.node) {
      this._node = node;
      this.refresh();
    } else {
      // TODO: more elegant way
      this.api.root().then(
        root => {
          this.api.path(root.id).then(path => {
            this.path = path;
          });
        }
      );
    }
  }

  // TODO: use it only with two way data-binding
  refresh() {
    if (this.node && this.node.node && this.node.node.id) {
      this.api.path(this.node.node.id).then(
        path => {
          this.path = path;
        });
    }
  }

  constructor(private api: ApiService) {
  }
}
