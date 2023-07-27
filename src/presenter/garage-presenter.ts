import GarageModel from "../model/garage-model"
import garageEventEmmiter from "../services/garage-eventEmmiter"
import { Car } from "../interfaces/car.interface"
import presenterEventEmmiter from "../services/presenter-eventEmmiter"

export default class GaragePresenter {
  constructor(private garageModel: GarageModel) {
    this.garageModel = garageModel
    this.initListeners()
    this.updateCars()
  }

  private initListeners = () => {
    garageEventEmmiter.on(garageEventEmmiter.events.NEXT_PAGE, this.nextPage)
    garageEventEmmiter.on(
      garageEventEmmiter.events.PREVIOUS_PAGE,
      this.previosPage
    )
    garageEventEmmiter.on(garageEventEmmiter.events.CREATE_CAR, this.createCar)
    garageEventEmmiter.on(garageEventEmmiter.events.CHANGE_CAR, this.changeCar)
    garageEventEmmiter.on(garageEventEmmiter.events.UPDATE_CAR, this.updateCar)
    garageEventEmmiter.on(garageEventEmmiter.events.DELETE_CAR, this.deleteCar)
    garageEventEmmiter.on(
      garageEventEmmiter.events.GENERATE_CARS,
      this.generateCars
    )
    garageEventEmmiter.on(garageEventEmmiter.events.START_CAR, this.startCar)
    garageEventEmmiter.on(garageEventEmmiter.events.START_RACE, this.startRace)
    garageEventEmmiter.on(garageEventEmmiter.events.STOP_RACE, this.stopRace)
    garageEventEmmiter.on(garageEventEmmiter.events.STOP_CAR, this.resetCar)
    garageEventEmmiter.on(garageEventEmmiter.events.FINISH_CAR, this.finishCar)
  }

  private finishCar = async (params: { car: Car; time: number }) => {
    const isFinishCar = this.garageModel.finishCar(params.car)
    const raceOver = this.garageModel.animationStatus
    if (!raceOver) return
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_WINNER, {
      car: this.garageModel.getWinner,
      time: params.time,
    })
    presenterEventEmmiter.emit(garageEventEmmiter.events.UPDATE_WINNER, {
      car: this.garageModel.getWinner,
      time: params.time,
    })
    this.stopRace()
  }

  private startRace = () => {
    const isRaceStarted = this.garageModel.startRace()
    if (!isRaceStarted) return
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_RACE)
  }

  private stopRace = async () => {
    const carsId = this.garageModel.stopRace()
    if (carsId) carsId.forEach(async (id) => await this.resetCar(id))
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_STOP_RACE)
  }

  private changeCar = (car: Car) => {
    if (this.garageModel.animationStatus) return
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_CHANGE, car)
  }

  private startCar = async (carId: number) => {
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
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_RESET, carId)
    const isCarStopped = await this.garageModel.stopCar(carId)
  }

  private generateCars = async () => {
    if (this.garageModel.animationStatus) return
    const isGenerated: boolean = await this.garageModel.generateCars()
    if (isGenerated) this.updateCars()
  }

  private deleteCar = async (id: number) => {
    if (this.garageModel.animationStatus) return
    if (!(await this.garageModel.deleteCar(id))) return

    const data = await this.garageModel.getCars()
    presenterEventEmmiter.emit(presenterEventEmmiter.events.DELETE_CAR, id)
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

  private updateCar = async (car: Car) => {
    if (this.garageModel.animationStatus) return
    const isCarUpdated: boolean = await this.garageModel.updateCar(car)
    if (isCarUpdated) this.updateCars()
  }

  private createCar = async (params: { carName: string; carColor: string }) => {
    if (this.garageModel.animationStatus) return
    const isCreate: boolean = await this.garageModel.createCar(params)
    if (isCreate) this.updateCars()
  }

  private nextPage = async () => {
    if (this.garageModel.animationStatus) return
    const isNext: boolean = this.garageModel.nextPage()
    if (isNext) this.updateCars()
  }

  private previosPage = async () => {
    if (this.garageModel.animationStatus) return
    const isPrevious: boolean = this.garageModel.previousPage()
    if (isPrevious) this.updateCars()
  }

  private updateCars = async () => {
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
