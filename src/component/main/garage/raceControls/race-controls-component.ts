import styles from "./race-controls.module.css"

import BaseComponent from "../../../../utils/baseComponent"

export default class RaceControlsComponent extends BaseComponent<"article"> {
  private raceButton!: BaseComponent

  private resetButton!: BaseComponent

  private generateButton!: BaseComponent

  constructor() {
    super({ tag: "article", className: styles.raceControls })
    this.initComponent()
  }

  private initComponent = () => {
    this.raceButton = new BaseComponent<"button">({
      tag: "button",
      content: "race",
      parent: this.node,
    })
    this.resetButton = new BaseComponent<"button">({
      tag: "button",
      content: "reset",
      parent: this.node,
    })
    this.generateButton = new BaseComponent<"button">({
      tag: "button",
      content: "generate",
      parent: this.node,
    })
  }
}
