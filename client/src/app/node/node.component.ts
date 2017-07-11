import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Node} from '../models/node.model';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit, AfterViewInit {

  @Output() @Input() selected = new EventEmitter<NodeComponent>();
  @Input() node: Node;
  @Input() selectedNodeComponent: NodeComponent;
  self = this;
  loadedNode: Promise<Node>;
  isOpen = false;
  @Input() parentComponent: NodeComponent;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.refresh();
  }

  ngAfterViewInit(): void {
  }

  isSelected() {
    return this.selectedNodeComponent && this.selectedNodeComponent.node && this.selectedNodeComponent.node.id === this.node.id;
  }

  refresh() {
    this.loadedNode = (this.node) ? this.api.get(this.node.id) : this.api.root();
    this.loadedNode.then(node => {
      const previousNode = this.node;
        this.node = node;
        this.api.children(this.node.id).then(
          nodes => {
            this.node.children = nodes;
          }
        );
      }
    ).catch(err => {
      this.selected.emit(this.parentComponent);
      this.parentComponent.refresh();
    });
  }

  onSelect(node: NodeComponent) {
    this.selected.emit(this);
    this.selectedNodeComponent = this;
    console.log();
  }

  onNavigateNode(node: NodeComponent) {
    this.selectedNodeComponent = this;
  }

  toggle() {
    this.loadedNode.then(
      node => {
        if (!node.terminal) {
          this.isOpen = !this.isOpen;
          this.refresh();
        }
      }
    );
  }
}
