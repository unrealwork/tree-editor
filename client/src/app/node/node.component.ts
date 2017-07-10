import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Node} from '../models/node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Output() @Input() selected = new EventEmitter<Node>();
  @Input() node: Node;
  @Input() selectedNode: Node;
  loadedNode: Promise<Node>;
  children: Promise<Array<Node>>;
  isOpen = false;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.refresh();
  }

  isSelected() {
    return this.selectedNode && this.node && this.selectedNode.id === this.node.id;
  }

  private refresh() {
    this.loadedNode = (this.node) ? this.api.get(this.node.id) : this.api.root();
    this.loadedNode.then(node => {
        this.node = node;
        this.api.children(this.node.id).then(
          nodes => {
            this.node.children = nodes;
          }
        );
      }
    );
  }

  onSelect(node: Node) {
    this.selected.emit(node);
    this.selectedNode = node;
    console.log();
  }

  onNavigateNode(node: Node) {
    this.selectedNode = node;
  }

  toggle() {
    this.refresh();
    this.loadedNode.then(
      node => {
        if (!node.terminal) {
          this.isOpen = !this.isOpen;
        }
      }
    );
  }
}
