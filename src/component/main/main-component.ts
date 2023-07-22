import BaseComponent from "../../utils/baseComponent"

export class MainComponent extends BaseComponent<"main"> {
  constructor() {
    super({ tag: "main", className: "container" })
  }
}
