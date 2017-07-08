import {Description} from './description.model';

export class Node {
  get content(): Description {
    return this._content;
  }

  get parent(): Node {
    return this._parent;
  }

  get id(): number {
    return this._id;
  }

  get root(): boolean {
    return this._root;
  }

  get terminal(): boolean {
    return this._terminal;
  }

  get level(): number {
    return this._level;
  }

  private _content: Description;
  private _parent: Node;
  private _id: number;
  private _root: boolean;
  private _terminal: boolean;
  private _level: number;
}
