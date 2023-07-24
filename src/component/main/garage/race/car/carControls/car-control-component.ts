import styles from "./car-control.module.css"
import BaseComponent from "../../../../../../utils/baseComponent"
import garageEventEmmiter from "../../../../../../services/garage-eventEmmiter"
import { Car } from "../../../../../../interfaces/car.interface"
import { cli } from "webpack"

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
  }

  private initComponent = () => {
    this.startButton = new BaseComponent<"button">({
      tag: "button",
      content: "start",
      parent: this.node,
    })
    this.stopButtom = new BaseComponent<"button">({
      tag: "button",
      content: "stop",
      parent: this.node,
    })
    this.editButtom = new BaseComponent<"button">({
      tag: "button",
      content: "edit",
      parent: this.node,
    })
    this.removeButtom = new BaseComponent<"button">({
      tag: "button",
      content: "remove",
      parent: this.node,
    })

    this.nameSpan = new BaseComponent<"span">({
      tag: "span",
      parent: this.node,
      className: styles.name,
    })
  }
}
