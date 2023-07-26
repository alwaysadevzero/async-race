import styles from "./race-controls.module.css"

import BaseComponent from "../../../../utils/baseComponent"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"
import throttle from "../../../../utils/throttle"

const DELAY = 2000

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
      console.log(1234)
      this.generateCarsThrottled()
    })
    this.raceButton.addListener("click", () => {
      this.raceCarsThrottled()
    })

    this.resetButton.addListener("click", () => {
      this.resetCarsThrottled()
    })
  }

  private generateCarsThrottled = throttle(() => {
    garageEventEmmiter.emit(garageEventEmmiter.events.GENERATE_CARS)
  }, DELAY)

  private raceCarsThrottled = throttle(() => {
    garageEventEmmiter.emit(garageEventEmmiter.events.START_RACE)
  }, DELAY)

  private resetCarsThrottled = throttle(() => {
    garageEventEmmiter.emit(garageEventEmmiter.events.GENERATE_CARS)
  }, DELAY)

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
