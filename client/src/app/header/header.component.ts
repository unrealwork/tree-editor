import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NodeComponent} from '../node/node.component';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
  }
)
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();
  @Input() loadedFeature: string;
  @Input() isNodeSelected = false;
  @Input() destNode: NodeComponent;

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
    this.loadedFeature = feature;
    this.destNode.collapseAll();
  }
}
