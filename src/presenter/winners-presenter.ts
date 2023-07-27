import winnerEventEmmiter from "../services/winners-eventEmmiter"
import WinnerModel from "../model/winner-model"
import presenterEventEmmiter from "../services/presenter-eventEmmiter"
import { Car } from "../interfaces/car.interface"

export default class WinnerPresenter {
  constructor(private winnerModel: WinnerModel) {
    this.getWinners()
    this.initListeners()
  }

  private initListeners = () => {
    presenterEventEmmiter.on(
      presenterEventEmmiter.events.UPDATE_WINNER,
      this.updateWinner
    )
    presenterEventEmmiter.on(
      presenterEventEmmiter.events.DELETE_CAR,
      this.deleteWinner
    )
  }

  private deleteWinner = async (winnerId: number) => {
    const Isdeleted: boolean = await this.winnerModel.deleteWinner(winnerId)
    if (Isdeleted) this.getWinners()
  }

  private updateWinner = async (params: {
    car: Car
    time: number
  }): Promise<void> => {
    const winner = await this.winnerModel.getWinner(params.car.id)
    console.log(winner)
    if (winner) {
      this.winnerModel.updateWinner({
        time: String(params.time),
        wins: winner.wins,
        id: winner.id,
      })
      this.getWinners()
      return
    }
    const createWinner: boolean = await this.winnerModel.createWinner({
      time: String(params.time),
      id: params.car.id,
    })
    console.log(createWinner)
    if (createWinner) this.getWinners()
  }

  private getWinners = async () => {
    const winners = await this.winnerModel.getWinners()
    if (winners) {
      winnerEventEmmiter.emit(
        winnerEventEmmiter.events.DRAW_CARS,
        winners.winners
      )
      winnerEventEmmiter.emit(winnerEventEmmiter.events.DRAW_PANEL, {
        total: winners.totalCount,
        page: winners.page,
      })
    }
  }
}
