import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {Node} from './models/node.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {

  loadedFeature: string;
  node: Node;

  ngOnInit(): void {
  }


  onNavigate(feature: string) {
    console.log(`Switch to ${feature} mode`);
    this.loadedFeature = feature;
  }

  onNavigateNode(node: Node) {
    console.log(`Navigate to ${JSON.stringify(node)}`);
    this.node = node;
  }

  onAdd(node: Node) {
    console.log(node);
    this.node = node;
  }

  isNodeSelected() {
    console.log(`Selected Node: ${!!this.node}`);
    return (!!this.node);
  }

  constructor(private api: ApiService) {
  }

}
