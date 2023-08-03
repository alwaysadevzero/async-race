import styles from "./car-control.module.css"
import BaseComponent from "../../../../../base-component"
import garageEventEmmiter from "../../../../../../services/garage-eventEmmiter"
import { Car } from "../../../../../../interfaces/car.interface"

export default class CarControlComponent extends BaseComponent {
  private startButton!: BaseComponent

  private stopButtom!: BaseComponent

  private editButtom!: BaseComponent

  private removeButtom!: BaseComponent

  private nameSpan!: BaseComponent

  constructor(private car: Car) {
    super({ className: styles.CarControlComponent })
    this.car = car
    this.initComponent()
    this.initListeners()
  }

  public setName(name: string) {
    this.nameSpan.setContent(name)
  }

  private initListeners = () => {
    this.editButtom.addListener("click", () => {
      garageEventEmmiter.emit(garageEventEmmiter.events.CHANGE_CAR, this.car)
    })

    this.removeButtom.addListener("click", () =>
      garageEventEmmiter.emit(garageEventEmmiter.events.DELETE_CAR, this.car.id)
    )
    this.startButton.addListener("click", () =>
      garageEventEmmiter.emit(garageEventEmmiter.events.START_CAR, this.car.id)
    )
    this.stopButtom.addListener("click", () =>
      garageEventEmmiter.emit(garageEventEmmiter.events.STOP_CAR, this.car.id)
    )
  }

  private initComponent = () => {
    this.startButton = new BaseComponent<"button">({
      tag: "button",
      content: "start",
      className: styles.button,
      parent: this.node,
    })
    this.stopButtom = new BaseComponent<"button">({
      tag: "button",
      content: "reset",
      className: styles.button,
      parent: this.node,
    })
    this.editButtom = new BaseComponent<"button">({
      tag: "button",
      content: "edit",
      className: styles.button,
      parent: this.node,
    })
    this.removeButtom = new BaseComponent<"button">({
      tag: "button",
      content: "remove",
      className: styles.button,
      parent: this.node,
    })

    this.nameSpan = new BaseComponent<"span">({
      tag: "span",
      parent: this.node,
      className: styles.name,
    })
  }
}
