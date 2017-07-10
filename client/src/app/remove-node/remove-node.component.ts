import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Node} from '../models/node.model';


@Component({
  selector: 'app-remove-node',
  templateUrl: './remove-node.component.html',
  styleUrls: ['./remove-node.component.css']
})
export class RemoveNodeComponent implements OnInit {

  @Input() node: Node;
  @Output() sumbit = new EventEmitter<string>();
  @Output() addedNode = new EventEmitter<Node>();

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

  remove() {
    console.log(`Remove node: ${JSON.stringify(this.node)}`);
    this.api.remove(this.node.id).then(node => {
    });
    this.sumbit.emit('');
  }

  onSubmit() {

  }

}
