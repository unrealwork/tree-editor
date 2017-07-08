import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {NodeComponent} from 'app/node/node.component';

@Injectable()
export class SelectionService {
  private selectedComponent: NodeComponent;

  update(node: NodeComponent) {
    this.selectedComponent.isSelected = false;
    this.selectedComponent = node;
  }
}
