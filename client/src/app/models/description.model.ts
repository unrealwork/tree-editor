export class Description {
  private _name: String;
  get name(): String {
    return this._name;
  }

  constructor(name: String) {
    this._name = name;
  }
}
