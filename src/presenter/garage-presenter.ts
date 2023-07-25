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
    garageEventEmmiter.on(
      garageEventEmmiter.events.START_CAR,
      this.startCar.bind(this)
    )
    garageEventEmmiter.on(garageEventEmmiter.events.START_RACE, this.startRace)
    garageEventEmmiter.on(garageEventEmmiter.events.STOP_RACE, this.stopRace)
    garageEventEmmiter.on(garageEventEmmiter.events.STOP_CAR, this.resetCar)
    garageEventEmmiter.on(garageEventEmmiter.events.FINISH_CAR, this.finishCar)
  }

  private finishCar = (params: { car: Car; time: number }) => {
    const isThisCarWinner = this.garageModel.finishCar(params.car.id)
    console.log("winner car id ", isThisCarWinner)
    if (isThisCarWinner)
      garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_WINNER, params)
  }

  private startRace = () => {
    if (this.garageModel.animationStatus) return
    const isRaceStarted = this.garageModel.startRace()
    console.log("start car id", isRaceStarted)
    if (!isRaceStarted) return
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_RACE)
  }

  private stopRace = () => {
    if (!this.garageModel.animationStatus) return
    const isRaceStarted = this.garageModel.stopRace()
    console.log("stop car id ", isRaceStarted)
    if (!isRaceStarted) return
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_STOP_RACE)
  }

  private changeCar = (car: Car) => {
    if (this.garageModel.animationStatus) return
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_CHANGE, car)
  }

  private async startCar(carId: number) {
    const trace = await this.garageModel.startCar(carId)
    if (trace)
      garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_START, {
        carId,
        trace,
      })
    const engineStatus = await this.garageModel.driveCar(carId)
    if (!engineStatus)
      garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_STOP, carId)
  }

  private resetCar = async (carId: number) => {
    const isCarStopped = await this.garageModel.stopCar(carId)
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_RESET, carId)
  }

  private async generateCars() {
    if (this.garageModel.animationStatus) return
    const isGenerated: boolean = await this.garageModel.generateCars()
    if (isGenerated) this.updateCars()
  }

  private async deleteCar(id: number) {
    if (this.garageModel.animationStatus) return
    if (!(await this.garageModel.deleteCar(id))) return

    const data = await this.garageModel.getCars()
    if (!data || (data.cars.length === 0 && Number(data.totalCount) > 1)) {
      this.previosPage()
    } else {
      garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_CARS, data.cars)
      garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_PANEL, {
        total: data.totalCount,
        page: data.page,
      })
    }
  }

  private async updateCar(car: Car) {
    if (this.garageModel.animationStatus) return
    const isCarUpdated: boolean = await this.garageModel.updateCar(car)
    if (isCarUpdated) this.updateCars()
  }

  private async createCar(params: { carName: string; carColor: string }) {
    if (this.garageModel.animationStatus) return
    const isCreate: boolean = await this.garageModel.createCar(params)
    if (isCreate) this.updateCars()
  }

  private async nextPage() {
    if (this.garageModel.animationStatus) return
    const isNext: boolean = this.garageModel.nextPage()
    if (isNext) this.updateCars()
  }

  private async previosPage() {
    if (this.garageModel.animationStatus) return
    const isPrevious: boolean = this.garageModel.previousPage()
    if (isPrevious) this.updateCars()
  }

  private async updateCars() {
    if (this.garageModel.animationStatus) return
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
