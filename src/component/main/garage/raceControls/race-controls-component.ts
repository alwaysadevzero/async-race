import styles from "./race-controls.module.css"

import BaseComponent from "../../../../utils/baseComponent"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"

export default class RaceControlsComponent extends BaseComponent<"article"> {
  private raceButton!: BaseComponent

  private resetButton!: BaseComponent

  private generateButton!: BaseComponent

  constructor() {
    super({ tag: "article", className: styles.raceControls })
    this.initComponent()
    this.initListeners()
  }

  private initListeners = () => {
    this.generateButton.addListener("click", () => {
      garageEventEmmiter.emit(garageEventEmmiter.events.GENERATE_CARS)
    })
    this.raceButton.addListener("click", () => {
      garageEventEmmiter.emit(garageEventEmmiter.events.START_RACE)
    })
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
