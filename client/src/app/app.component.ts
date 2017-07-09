import {Component, OnInit} from '@angular/core';
import {ApiService} from './services/api.service';
import {SelectionService} from './services/selection.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent implements OnInit {
  isSelected = false;

  ngOnInit(): void {
    this.selectionService.selectedComponent$.subscribe(
      res => {
        console.log('a');
        if (res) {
          this.isSelected = true;
        }
      },
      err => {
      }
    );
  }

  constructor(private api: ApiService, private selectionService: SelectionService) {
  }
}
