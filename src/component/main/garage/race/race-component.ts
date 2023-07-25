import styles from "./race.module.css"
import BaseComponent from "../../../../utils/baseComponent"
import CarComponent from "./car/car-component"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"
import { Car } from "../../../../interfaces/car.interface"

export default class RaceComponent extends BaseComponent {
  private carsNumber: number | null

  private carsArr: CarComponent[] = []

  constructor() {
    super({ className: styles.race })
    this.initListeners()
  }

  private initListeners = () => {
    garageEventEmmiter.on(garageEventEmmiter.events.DRAW_CARS, this.drawCars)
    garageEventEmmiter.on(garageEventEmmiter.events.DRAW_RACE, this.drawRace)
  }

  private drawRace = () => {
    if (!this.carsArr) return
    this.carsArr.forEach((car) => {
      garageEventEmmiter.emit(garageEventEmmiter.events.START_CAR, car.car.id)
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
    this.node.innerHTML = ""
    this.append(...this.carsArr)
  }
}
