import styles from "./car.module.css"
import BaseComponent from "../../../../../utils/baseComponent"
import { Car } from "../../../../../interfaces/car.interface"
import CarControlComponent from "./carControls/car-control-component"
import machineSVG from "../../../../../assets/machine.svg"

export default class CarComponent extends BaseComponent {
  private trace: BaseComponent

  private carControl = new CarControlComponent()

  private id: number | null

  constructor() {
    super({})
    this.initComponent()
  }

  public updateCar = (car: Car) => {
    this.carControl.setName(car.name)
    this.trace.node.style.setProperty("--car-color", car.color)
  }

  private initComponent = () => {
    this.append(this.carControl)
    const wrapper = new BaseComponent({
      className: styles.wrapper,
      parent: this.node,
    })
    this.trace = new BaseComponent<"input">({
      tag: "input",
      className: styles.trace,
      parent: wrapper.node,
      attributes: { type: "range", value: "0", max: "1" },
    })
  }
}
