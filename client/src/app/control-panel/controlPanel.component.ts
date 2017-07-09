import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services/api.service';
import {SelectionService} from '../services/selection.service';
import {ControlState} from './controlState.enum';

@Component({
  selector: 'app-control-panel',
  templateUrl: './controlPanel.component.html',
  styleUrls: ['./controlPanel.component.css']
})
export class ControlPanelComponent implements OnInit {
  private state: ControlState = null;
  isEditState = (this.state === ControlState.EDIT);
  isRemoveState = (this.state === ControlState.REMOVE);
  isMoveState = (this.state === ControlState.MOVE);

  constructor(private api: ApiService, private selectionService: SelectionService) {
  }

  isAddState() {
    return this.state === ControlState.ADD;
  };


  ngOnInit(): void {
  }

  addChild(): void {
  }

  onSubmit() {

  }

  enableAddMode() {
    this.state = this.isAddState() ? null : ControlState.ADD;
  }

  enableEditMode() {
    this.state = ControlState.EDIT;
  }

  enableRemoveMode() {
    this.state = ControlState.REMOVE;
  }

  enableMoveMode() {
    this.state = ControlState.MOVE;
  }
}
