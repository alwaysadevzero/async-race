import styles from "./car.module.css"
import BaseComponent from "../../../../../utils/baseComponent"
import { Car } from "../../../../../interfaces/car.interface"
import CarControlComponent from "./carControls/car-control-component"
import garageEventEmmiter from "../../../../../services/garage-eventEmmiter"
import { Trace } from "../../../../../interfaces/trace.interface"

const SPEED = 10
const MILISECONDS = 1000

export default class CarComponent extends BaseComponent {
  private trace: BaseComponent

  private carControl!: CarControlComponent

  private animationId = 0

  constructor(public car: Car) {
    super({})
    this.car = car
    this.initComponent()
    this.initListeners()
  }

  public updateCar = (car: Car) => {
    this.carControl.setName(car.name)
    this.trace.node.style.setProperty("--car-color", car.color)
  }

  private initListeners = () => {
    garageEventEmmiter.on(garageEventEmmiter.events.DRAW_START, this.startCar)
    garageEventEmmiter.on(garageEventEmmiter.events.DRAW_STOP, this.stopCar)
    garageEventEmmiter.on(garageEventEmmiter.events.DRAW_RESET, this.resetCar)
  }

  private startCar = (params: { carId: number; trace: Trace }) => {
    if (params.carId !== this.car.id || this.animationId) return
    this.startAnimation(params.trace)
  }

  private stopCar = (carId: number) => {
    if (carId !== this.car.id || !this.animationId) return
    this.stopAnimation()
  }

  private resetCar = (carId: number) => {
    if (carId !== this.car.id) return
    if (this.animationId) this.stopAnimation()
    this.trace.setAttributes({ value: `${0}` })
  }

  private startAnimation = (trace: Trace) => {
    this.trace.setAttributes({ max: `${trace.distance}` })
    let step = 0
    const animate = () => {
      this.trace.setAttributes({ value: `${step}` })
      step += trace.velocity * SPEED
      if (step <= trace.distance) {
        this.animationId = requestAnimationFrame(animate)
      } else {
        this.stopAnimation()
        garageEventEmmiter.emit(garageEventEmmiter.events.FINISH_CAR, {
          car: this.car,
          time: (trace.distance / (trace.velocity * MILISECONDS)).toFixed(1),
        })
      }
    }
    this.animationId = requestAnimationFrame(animate)
  }

  private stopAnimation = () => {
    if (!this.animationId) return
    cancelAnimationFrame(this.animationId)
    this.animationId = 0
  }

  private initComponent = () => {
    this.carControl = new CarControlComponent(this.car)
    this.append(this.carControl)
    const wrapper = new BaseComponent({
      className: styles.wrapper,
      parent: this.node,
    })
    this.trace = new BaseComponent<"input">({
      tag: "input",
      className: styles.trace,
      parent: wrapper.node,
      attributes: { type: "range", value: "0", max: "20000" },
    })
  }
}
