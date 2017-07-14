import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {ApiService} from './services/api.service';
import {NodeComponent} from './node/node.component';
import {NodePathComponent} from './node-path/node-path.component';
import {Message} from './models/message.model';
import {MessageType} from './models/message-type.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('main') nodeComponent: NodeComponent = null;
  @ViewChild(NodePathComponent) pathComponent;
  loadedFeature = '';
  message: Message = new Message('Welcome',
    'To modify component you should select node in TREE section and then choose action in menu',
    MessageType.NORMAL);


  onNavigate(feature: string) {
    console.log(`Switch to ${feature} mode`);
    if (this.loadedFeature === 'edit' && feature !== '') {
      this.pathComponent.refresh();
    }
    this.loadedFeature = feature;
  }

  onNavigateNode(node: NodeComponent) {
    if (this.loadedFeature !== 'move') {
      this.nodeComponent = node;
    }
  }

  onMessage(message: Message) {
    console.log('a');
    this.message = message;
  }

  isNodeSelected() {
    return (!!this.nodeComponent);
  }

  constructor(private api: ApiService) {
  }

  ngAfterViewInit(): void {
  }
}
