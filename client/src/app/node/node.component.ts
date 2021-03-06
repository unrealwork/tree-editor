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
  isLoading = false;
  loadedNode: Promise<Node>;
  isOpen = false;
  @Input() parentComponent: NodeComponent;
  @ViewChildren(NodeComponent) childrenComponents: QueryList<NodeComponent>;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.refresh();
  }

  isSelected() {
    return this.selectedNodeComponent && this.selectedNodeComponent.node && this.selectedNodeComponent.node.id === this.node.id;
  }

  refresh(cb?: () => any) {
    this.loadedNode = (this.node) ? this.api.get(this.node.id) : this.api.root();
    this.loadedNode.then(node => {
        const previousNode = this.node;
        this.node = node;
        if (previousNode && (previousNode.terminal !== this.node.terminal)) {
          this.isOpen = true;
        }
        this.isLoading = false;
        this.api.children(this.node.id).then(
          nodes => {
            if (cb) {
              cb();
            }
            this.node.children = nodes;
            if (this.childrenComponents) {
              const children: Array<NodeComponent> = (this.childrenComponents) ?
                this.childrenComponents.toArray() : [];
              for (const child of  children) {
                const res = child.find(node);
                // child.refresh();
              }
            }
          }
        );
      }
    ).catch(err => {
      this.selected.emit(this.parentComponent);
      this.parentComponent.refresh();
    });
  }

  collapse() {
    this.isOpen = false;
  }

  collapseAll() {
    if (this.parentComponent) {
      this.parentComponent.collapse();
    } else {
      this.collapse();
    }
  }

  onSelect(node: NodeComponent) {
    this.selected.emit(this);
    this.selectedNodeComponent = this;
  }

  onNavigateNode(node: NodeComponent) {
    this.selectedNodeComponent = this;
  }

  toggle() {
    this.loadedNode.then(
      node => {
        if (!node.terminal) {
          if (!this.isOpen) {
            this.isLoading = true;
            setTimeout(() => {
              this.refresh(() => {
                this.isLoading = false;
                this.isOpen = true;
              });
            }, 2000);
          } else {
            this.isOpen = false;
          }
        }
      }
    );
  }

  root(): NodeComponent {
    if (this.parentComponent == null) {
      return this;
    } else {
      return this.parentComponent.root();
    }
  }

  find(node: Node): NodeComponent {
    if (this.node.id === node.id) {
      return this;
    } else {
      const children: Array<NodeComponent> = (this.childrenComponents) ?
        this.childrenComponents.toArray() : [];
      for (const child of  children) {
        const res = child.find(node);
        if (res) {
          return res;
        }
      }
    }
    return null;
  }
}
