import RaceApi from "../services/race-api"
import Winner from "../interfaces/winner.interface"
import { Car } from "../interfaces/car.interface"
import GetWinners from "../interfaces/get-winners.interface"
import HttpStatusCode from "../enums/http-status-code"
import { sortMethod } from "../enums/enum-sort-method"

interface WinnerState {
  sortMethod: "wins" | "time"
  sortOrder: "ASC" | "DESC"
  currentPage: number
  carsPerPage: number
  totalCars: number | null
  totalPages: number | null
}

const state: WinnerState = {
  sortMethod: "wins",
  sortOrder: "ASC",
  currentPage: 1,
  carsPerPage: 10,
  totalCars: null,
  totalPages: null,
}

export default class WinnerModel {
  private api = new RaceApi()

  private state = state

  public changeTypeSortWinner = (sortMethod: sortMethod) => {
    this.state.sortMethod = sortMethod

    this.state.sortOrder = this.state.sortOrder === "ASC" ? "DESC" : "ASC"
    console.log(sortMethod, this.state.sortOrder)
  }

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

  public getWinner = async (winnerId: number): Promise<Winner | undefined> => {
    const response = await this.api.getWinner(winnerId)
    const winner = await response.json()
    if (response.status !== HttpStatusCode.OK_200) return undefined
    try {
      if (response) return winner
      throw new Error("invalid response winner")
    } catch (err) {
      console.error("invalid response winner data")
    }
    return undefined
  }

  public createWinner = async (
    winner: Omit<Winner, "wins">
  ): Promise<boolean> => {
    const status = await this.api.createWinner(winner)
    console.log("CREATE WINNER", winner.id)
    if (status === HttpStatusCode.CREATED_201) return true
    return false
  }

  public deleteWinner = async (winnerId: number): Promise<boolean> => {
    const status = await this.api.deleteWinner(winnerId)
    if (status === HttpStatusCode.OK_200) return true
    return false
  }

  public updateWinner = async (winner: Winner): Promise<boolean> => {
    const status = await this.api.updateWinner(winner)
    if (status === HttpStatusCode.OK_200) return true
    return false
  }

  public getWinners = async (): Promise<GetWinners | undefined> => {
    try {
      const response = await this.api.getWinners(
        this.state.currentPage.toString(),
        this.state.carsPerPage.toString(),
        this.state.sortMethod,
        this.state.sortOrder
      )
      if (!response || !response.winners || !response.totalCount)
        throw new Error("Failed to get winners")

      this.state.totalCars = +response.totalCount
      this.state.totalPages = Math.ceil(
        +response.totalCount / this.state.carsPerPage
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
        winners,
        totalCount: this.state.totalCars,
        page: this.state.currentPage,
      }
    } catch (error) {
      console.error("Error fetching winners:", error)
      return undefined
    }
  }
}
