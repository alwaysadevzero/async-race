import RaceApi from "../services/race-api"
import Winner from "../interfaces/winner.interface"
import { Car } from "../interfaces/car.interface"
import GetWinners from "../interfaces/get-winners.interface"

interface WinnerState {
  sortMethod: "id" | "wins" | "time"
  sortOrder: "ASC" | "DESC"
  currentPage: number
  carsPerPage: number
  totalCars: number | null
  totalPages: number | null
}

const state: WinnerState = {
  sortMethod: "id",
  sortOrder: "ASC",
  currentPage: 1,
  carsPerPage: 10,
  totalCars: null,
  totalPages: null,
}

export default class WinnerModel {
  private api = new RaceApi()
  private state = state

  public nextPage = (): false | true => {
    if (!this.state?.totalPages) return false
    if (this.state.currentPage < this.state.totalPages) {
      this.state.currentPage += 1
      return true
    }
    return false
  }

  public previousPage = (): false | true => {
    if (!this.state.totalPages) return false
    if (this.state.currentPage > 1) {
      this.state.currentPage -= 1
      return true
    }
    return false
  }

  public async getWinners(): Promise<GetWinners | undefined> {
    try {
      const response: Omit<GetWinners, "page"> | undefined =
        await this.api.getWinners(
          this.state.currentPage.toString(),
          this.state.carsPerPage.toString(),
          this.state.sortMethod,
          this.state.sortOrder
        )
      if (!response || !response.winners)
        throw new Error("Failed to get winners")
      this.state.totalCars = response.totalCount
      this.state.totalPages = Math.ceil(
        response.totalCount / this.state.carsPerPage
      )

      const carsPromises = response.winners.map((winner) =>
        this.api.getCar(+winner.id)
      )
      const cars = await Promise.all(carsPromises)
      const winners: (Winner & Car)[] = response.winners.map(
        (winner, index) => ({
          ...winner,
          ...cars[index],
        })
      )

      return {
        winners: winners,
        totalCount: response.totalCount,
        page: this.state.totalPages,
      }
    } catch (error) {
      console.error("Error fetching winners:", error)
      return undefined
    }
  }
}
