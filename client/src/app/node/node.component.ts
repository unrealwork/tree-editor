import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
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
  @ViewChildren(NodeComponent) childrenComponents: QueryList<NodeComponent>;

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
      if (this.childrenComponents) {
        this.childrenComponents.forEach(c => {
          c.refresh();
        });
      }
      if (previousNode && (previousNode.terminal !== this.node.terminal)) {
        this.isOpen = true;
      }
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
          console.log('what?');
          this.isOpen = !this.isOpen;
          this.refresh();
        }
      }
    );
  }
}
