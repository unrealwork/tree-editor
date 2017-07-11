import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ApiService} from './services/api.service';
import {Node} from './models/node.model';
import {NodeComponent} from './node/node.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements AfterViewInit {

  @ViewChild(NodeComponent) nodeComponent = null;

  loadedFeature: string;


  onNavigate(feature: string) {
    console.log(`Switch to ${feature} mode`);
    this.loadedFeature = feature;
  }

  onNavigateNode(node: NodeComponent) {
    this.nodeComponent = node;
  }

  onAdd(node: Node) {
    console.log(node);
  }

  isNodeSelected() {
    return (!!this.nodeComponent);
  }

  constructor(private api: ApiService) {
  }

  ngAfterViewInit(): void {
  }
}
