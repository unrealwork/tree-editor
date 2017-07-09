import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Node} from '../models/node.model';
import {SelectionService} from '../services/selection.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {
  @Input() id: number;
  node: Promise<Node>;
  children: Promise<Array<Node>>;
  isOpen = false;
  isSelected = false;

  constructor(private api: ApiService, private selectionService: SelectionService) {
  }

  ngOnInit() {
    this.refresh();
  }

  private refresh() {
    this.node = (this.id) ? this.api.get(this.id) : this.api.root();
    this.node.then(node => {
      this.children = this.api.children(node.id);
    });
  }

  select() {
    this.isSelected = true;
    this.selectionService.update(this);
  }

  toggle() {
    this.refresh();
    this.node.then(
      node => {
        if (!node.terminal) {
          this.isOpen = !this.isOpen;
        }
      }
    );
  }
}
