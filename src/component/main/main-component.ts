import BaseComponent from "../base-component"

export class MainComponent extends BaseComponent<"main"> {
  constructor() {
    super({ tag: "main", className: "container" })
  }
}
