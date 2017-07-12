import {MessageType} from './message-type.model';
export class Message {
  set timeout(value: number) {
    this._timeout = value;
  }

  get timeout(): number {
    return this._timeout;
  }

  get type(): MessageType {
    return this._type;
  }

  private _header;
  private _content;
  private _type: MessageType;
  private _timeout = 0;

  constructor(header: string, content: string, type: MessageType) {
    this._header = header;
    this._content = content;
    this._type = type;
  }

  get header() {
    return this._header;
  }

  get content() {
    return this._content;
  }
}
