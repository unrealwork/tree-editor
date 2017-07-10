import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Node} from '../models/node.model';
import {Description} from '../models/description.model';
import {ActionPopupComponent} from '../action-popup/action-popup.component';

@Component({
  selector: 'app-add-node',
  templateUrl: './add-node.component.html',
  styleUrls: ['./add-node.component.css']
})
export class AddNodeComponent extends ActionPopupComponent implements OnInit, AfterViewInit {
  @Output() addedNode = new EventEmitter<Node>();
  @Output() featureChanged = new EventEmitter<string>();
  description: Description = new Description('');
  @Input() node: Node;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.description = new Description('');
  }

  addChild(content: string) {
    const desc = new Description(content);
    this.api.addChild(this.node.id, desc).then(node => {
      this.addedNode.emit(node);
    });
    this.description = new Description('');
    this.close();
  }

  onSubmit() {
  }
}
