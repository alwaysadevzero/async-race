import styles from "./car.module.css"
import BaseComponent from "../../../../../utils/baseComponent"
import { Car } from "../../../../../interfaces/car.interface"
import CarControlComponent from "./carControls/car-control-component"
export default class CarComponent extends BaseComponent {
  private trace: BaseComponent

  private id: number | null

  constructor() {
    super({})
    this.initComponent()
  }

  public updateCar = (car: Car) => {}

  private initComponent = () => {
    const carControl = new CarControlComponent()
    this.append(carControl)
    const wrapper = new BaseComponent({
      className: styles.wrapper,
      parent: this.node,
    })
    this.trace = new BaseComponent<"input">({
      tag: "input",
      className: styles.trace,
      parent: wrapper.node,
      attributes: { type: "range", value: "0", max: "50000" },
    })
  }
}
