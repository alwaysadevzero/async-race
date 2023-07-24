import { GarageState } from "../interfaces/garage-state.interface"
import RaceApi from "../services/race-api"
import { Car } from "../interfaces/car.interface"

export default class GarageModel {
  private api = new RaceApi()

  constructor(private state: GarageState) {
    this.state = state
  }

  public async getCars(): Promise<
    { cars: Car[]; totalCount: string | null; page: number } | undefined
  > {
    try {
      const response = await this.api.getCars(
        this.state.currentPage,
        this.state.length
      )

      if (this.isValidCarResponse(response)) {
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
