import 'rxjs/add/operator/toPromise';
import {Injectable} from '@angular/core';
import {NodeComponent} from 'app/node/node.component';
import {Observable} from 'rxjs/';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SelectionService {
  private selectedComponent: BehaviorSubject<NodeComponent> = new BehaviorSubject(null);
  selectedComponent$ = this.selectedComponent.asObservable();

  currentNode() {
    this.selectedComponent.getValue();
  }

  update(node: NodeComponent) {
    const previousSelected: NodeComponent = this.selectedComponent.getValue();
    if (previousSelected != null) {
      previousSelected.isSelected = false;
    }
    this.selectedComponent.next(node);
  }
}
