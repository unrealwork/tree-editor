import {Component, EventEmitter, Input, Output} from '@angular/core';

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

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
    this.loadedFeature = feature;
  }
}
