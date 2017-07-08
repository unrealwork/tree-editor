import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {Node} from './models/node.model';
import {Description} from './models/description.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  data: Promise<Array<Node>>;
  title: 'Api test';
  root: Promise<Node>;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.root = this.api.get(1);
  }


  addChild(id: number, name: String): void {
    const content = new Description(name);
    this.api.addChild(id, content).then(
      node => {
        this.fetchData();
      }
    );
  }

  fetchData() {
    this.root = this.api.get(1);
  }
}
