import styles from "./car-updater.module.css"
import BaseComponent from "../../../base-component"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"
import { Car } from "../../../../interfaces/car-interface"

const THEME = {
  disabled: { "data-theme": "dark" },
  enabled: { "data-theme": "light" },
}

export default class CarUpdaterComponent extends BaseComponent<"article"> {
  private isEnable = false

  private updateButtom!: BaseComponent

  private color: BaseComponent

  private input: BaseComponent

  private car: Car | null = null

  constructor() {
    super({ tag: "article", className: styles.updater })
    this.initComponent()
    this.initListeners()
  }

  private initListeners = () => {
    garageEventEmmiter.on(
      garageEventEmmiter.events.DRAW_CHANGE,
      this.enableUserInput
    )
    this.updateButtom.addListener("click", this.changeCar)
  }

  private enableUserInput = (car: Car) => {
    this.setAttributes(THEME.enabled)
    this.car = car
    this.isEnable = true
    ;(this.color.node as HTMLInputElement).value = car.color
    ;(this.input.node as HTMLInputElement).value = car.name

    this.updateButtom.removeAttributes("disabled")
    this.color.removeAttributes("disabled")
    this.input.removeAttributes("disabled")
  }

  private changeCar = () => {
    if (!(this.car && this.isEnable)) return
    this.setAttributes(THEME.disabled)
    const car = {
      id: this.car.id,
      name: (this.input.node as HTMLInputElement).value,
      color: (this.color.node as HTMLInputElement).value,
    }
    garageEventEmmiter.emit(garageEventEmmiter.events.UPDATE_CAR, car)
    this.car = null
    this.updateButtom.setAttributes({ disabled: "" })
    this.color.setAttributes({ disabled: "" })
    this.input.setAttributes({ disabled: "" })
    ;(this.input.node as HTMLInputElement).value = ""
  }

  private initComponent = () => {
    this.input = new BaseComponent<"input">({
      tag: "input",
      parent: this.node,
      attributes: { maxlength: "20", disabled: "" },
    })
    const wrapper = new BaseComponent({
      parent: this.node,
      className: styles.wrapper,
    })
    this.color = new BaseComponent<"input">({
      tag: "input",
      parent: wrapper.node,
      className: styles.color,
      attributes: { type: "color", disabled: "" },
    })
    this.updateButtom = new BaseComponent<"button">({
      tag: "button",
      content: "update",
      className: styles.button,
      parent: wrapper.node,
      attributes: { type: "color", disabled: "" },
    })
  }
}
