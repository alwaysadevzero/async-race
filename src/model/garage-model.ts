import RaceApi from "../services/race-api"
import { Car } from "../interfaces/car.interface"
import { GarageState } from "../interfaces/garage-state.interface"
import generateCars from "../utils/createRandomCar"
import { Trace } from "../interfaces/trace.interface"
import { Race } from "../enums/enum-race-status"

const state: GarageState = {
  currentPage: 1,
  pageLength: null,
  carsLength: 7,
  generateLength: 100,
  activeCarsId: [],
  raceStatus: Race.STOP,
}

export default class GarageModel {
  private api = new RaceApi()

  private state = state

  public get animationStatus(): boolean {
    return this.state.activeCarsId.length > 0
  }

  public startRace = (): false | true => {
    if (this.state.raceStatus === Race.STOP) {
      this.state.raceStatus = Race.START
      return true
    }
    return false
  }

  public stopRace = (): false | true => {
    if (this.state.raceStatus === Race.START) {
      this.state.raceStatus = Race.STOP
      return true
    }
    return false
  }

  public nextPage = (): false | true => {
    if (!this.state?.pageLength) return false
    if (this.state.currentPage < this.state.pageLength) {
      this.state.currentPage += 1
      return true
    }
    return false
  }

  public previousPage = (): false | true => {
    if (!this.state.pageLength) return false
    if (this.state.currentPage > 1) {
      this.state.currentPage -= 1
      return true
    }
    return false
  }

  public async startCar(carId: number): Promise<Trace | undefined> {
    if (this.state.activeCarsId.includes(carId)) return undefined

    const response = await this.api.startEngine(carId)
    if (response) {
      this.state.activeCarsId.push(carId)
      return response
    }
    return undefined
  }

  public async stopCar(carId: number): Promise<boolean> {
    if (!this.state.activeCarsId.includes(carId)) return false
    this.state.activeCarsId = this.state.activeCarsId.filter(
      (car) => car !== car
    )
    const status = await this.api.stopEngine(carId)
    return status
  }

  public async driveCar(carId: number): Promise<boolean> {
    if (!this.state.activeCarsId.includes(carId)) return false
    const status = await this.api.driveEngine(carId)
    return status
  }

  public async generateCars(): Promise<boolean> {
    try {
      const carsToGenerate = generateCars(this.state.generateLength)
      const creationPromises = carsToGenerate.map((car) => {
        return this.api.createCar(car.name, car.color)
      })

      const statuses = await Promise.all(creationPromises)
      if (statuses.every((status) => status === 201)) return true
    } catch (error) {
      console.error("Error generating cars:", error)
    }
    return false
  }

  public async updateCar(car: Car): Promise<boolean> {
    const data = await this.api.updateCar(car)
    if (data?.name === car.name && data?.color === car.color) return true
    return false
  }

  public async deleteCar(id: number): Promise<boolean> {
    const status = await this.api.deleteCar(id)
    if (status) return true
    return false
  }

  public async createCar(params: {
    carName: string
    carColor: string
  }): Promise<boolean> {
    const status = await this.api.createCar(params.carName, params.carColor)
    if (status === 201) return true
    return false
  }

  public async getCars(): Promise<
    { cars: Car[]; totalCount: string | null; page: number } | undefined
  > {
    try {
      const response = await this.api.getCars(
        this.state.currentPage,
        this.state.carsLength
      )
      if (this.isValidCarResponse(response)) {
        this.state.currentPage = response.page
        this.state.pageLength = Math.ceil(
          +response.totalCount / this.state.carsLength
        )
        this.state
        return response
      }
      throw new Error("Invalid car data received")
    } catch (error) {
      console.error("Error fetching cars:", error)
      return undefined
    }
  }

  private isValidCarResponse(
    response: any
  ): response is { cars: Car[]; totalCount: string; page: number } {
    return (
      response &&
      response.cars &&
      typeof response.totalCount === "string" &&
      typeof response.page === "number"
    )
  }
}
