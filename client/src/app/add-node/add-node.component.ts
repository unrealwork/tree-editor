import {Component, Input, OnInit} from '@angular/core';
import {Node} from '../models/node.model';
import {ApiService} from '../services/api.service';
import {Description} from '../models/description.model';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent implements OnInit {
  @Input() node: Node;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    console.log(JSON.stringify(this.node));
  }

  addChild(content: string) {
    const desc = new Description(content);
    console.log(`Created description: ${JSON.stringify(desc)}`);
    this.api.addChild(this.node.id, desc).then(node => {
      this.node = node;
    });
  }

  onSubmit() {

  }
}
