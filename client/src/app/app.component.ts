import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from './services/api.service';
import {Node} from './models/node.model';
import {NodeComponent} from './node/node.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  @ViewChild(NodeComponent) nodeComponent;
  loadedFeature: string;
  node: NodeComponent;

  ngOnInit(): void {
  }


  onNavigate(feature: string) {
    console.log(`Switch to ${feature} mode`);
    this.loadedFeature = feature;
  }

  onNavigateNode(node: NodeComponent) {
    this.node = node;
  }

  onAdd(node: Node) {
    console.log(node);
  }

  isNodeSelected() {
    return (!!this.node);
  }

  constructor(private api: ApiService) {
  }

}
