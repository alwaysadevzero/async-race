import GarageModel from "../model/garage-model"
import garageEventEmmiter from "../services/garage-eventEmmiter"
import { Car } from "../interfaces/car.interface"

export default class GaragePresenter {
  constructor(private garageModel: GarageModel) {
    this.garageModel = garageModel
    this.initListeners()
    this.updateCars()
  }

  private initListeners = () => {
    garageEventEmmiter.on(
      garageEventEmmiter.events.NEXT_PAGE,
      this.nextPage.bind(this)
    )
    garageEventEmmiter.on(
      garageEventEmmiter.events.PREVIOUS_PAGE,
      this.previosPage.bind(this)
    )
    garageEventEmmiter.on(
      garageEventEmmiter.events.CREATE_CAR,
      this.createCar.bind(this)
    )
    garageEventEmmiter.on(garageEventEmmiter.events.CHANGE_CAR, this.changeCar)
    garageEventEmmiter.on(
      garageEventEmmiter.events.UPDATE_CAR,
      this.updateCar.bind(this)
    )
    garageEventEmmiter.on(
      garageEventEmmiter.events.DELETE_CAR,
      this.deleteCar.bind(this)
    )
    garageEventEmmiter.on(
      garageEventEmmiter.events.GENERATE_CARS,
      this.generateCars.bind(this)
    )
  }

  private changeCar = (car: Car) => {
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_CHANGE, car)
  }

  private async generateCars() {
    const isGenerated: boolean = await this.garageModel.generateCars()
    console.log(isGenerated)
    if (isGenerated) this.updateCars()
  }

  private async deleteCar(id: number) {
    const isDeleted: boolean = await this.garageModel.deleteCar(id)
    if (isDeleted) this.updateCars()
  }

  private async updateCar(car: Car) {
    const isCarUpdated: boolean = await this.garageModel.updateCar(car)
    if (isCarUpdated) this.updateCars()
  }

  private async createCar(params: { carName: string; carColor: string }) {
    const isCreate: boolean = await this.garageModel.createCar(params)
    if (isCreate) this.updateCars()
  }

  private async nextPage() {
    const isNext: boolean = this.garageModel.nextPage()
    if (isNext) this.updateCars()
  }

  private async previosPage() {
    const isPrevious: boolean = this.garageModel.previousPage()
    if (isPrevious) this.updateCars()
  }

  private async updateCars() {
    const data = await this.garageModel.getCars()
    if (data) {
      garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_CARS, data.cars)
      garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_PANEL, {
        total: data.totalCount,
        page: data.page,
      })
    }
  }
}
