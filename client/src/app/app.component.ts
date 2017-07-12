import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ApiService} from './services/api.service';
import {Node} from './models/node.model';
import {NodeComponent} from './node/node.component';
import {NodePathComponent} from './node-path/node-path.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements AfterViewInit {

  @ViewChild('main') nodeComponent = null;
  @ViewChild('dest') destinationComponent = null;
  @ViewChild(NodePathComponent) pathComponent;

  loadedFeature = '';


  onNavigate(feature: string) {
    console.log(`Switch to ${feature} mode`);
    if (this.loadedFeature === 'edit' && feature === '') {
      this.pathComponent.refresh();
    }
    this.loadedFeature = feature;
    this.destinationComponent.collapseAll();
  }

  onNavigateNode(node: NodeComponent) {
    if (this.loadedFeature !== 'move') {
      this.nodeComponent = node;
    } else {
      this.destinationComponent = node;
    }
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
