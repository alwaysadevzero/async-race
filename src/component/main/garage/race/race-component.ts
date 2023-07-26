import styles from "./race.module.css"
import BaseComponent from "../../../../utils/baseComponent"
import CarComponent from "./car/car-component"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"
import { Car } from "../../../../interfaces/car.interface"
import WinnerComponent from "../modal/winner-modal-component"

export default class RaceComponent extends BaseComponent {
  private carsNumber: number | null

  private carsArr: CarComponent[] = []

  private wrapper!: BaseComponent

  constructor() {
    super({ className: styles.race })
    this.initListeners()
    this.initComponent()
  }

  private initListeners = () => {
    garageEventEmmiter.on(garageEventEmmiter.events.DRAW_CARS, this.drawCars)
    garageEventEmmiter.on(
      garageEventEmmiter.events.DRAW_RACE,
      this.drawStartRace
    )
    garageEventEmmiter.on(
      garageEventEmmiter.events.DRAW_STOP_RACE,
      this.drawStopRace
    )
  }

  private initComponent = () => {
    this.wrapper = new BaseComponent({ parent: this.node })
    const winnerModal = new WinnerComponent()
    this.append(winnerModal)
  }

  private drawStartRace = () => {
    if (!this.carsArr) return
    this.carsArr.forEach((car) => {
      garageEventEmmiter.emit(garageEventEmmiter.events.START_CAR, car.car.id)
    })
  }

  private drawStopRace = () => {
    if (!this.carsArr) return
    this.carsArr.forEach((car) => {
      garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_RESET, car.car.id)
    })
  }

  private drawCars = (cars: Car[]) => {
    if (cars.length === this.carsNumber) {
      this.carsArr.forEach((car, index) => {
        car.updateCar(cars[index])
      })
      return
    }
    this.carsArr = cars.map((car) => {
      const carComp = new CarComponent(car)
      carComp.updateCar(car)
      return carComp
    })
    this.wrapper.node.innerHTML = ""
    this.wrapper.append(...this.carsArr)
  }
}
