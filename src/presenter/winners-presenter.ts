import winnerEventEmmiter from "../services/winners-eventEmmiter"
import WinnerModel from "../model/winner-model"
import presenterEventEmmiter from "../services/presenter-eventEmmiter"
import { Car } from "../interfaces/car.interface"
import { sortMethod } from "../enums/enum-sort-method"

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
    winnerEventEmmiter.on(winnerEventEmmiter.events.SORT, this.sort)
    winnerEventEmmiter.on(winnerEventEmmiter.events.NEXT_PAGE, this.nextPage)
    winnerEventEmmiter.on(
      winnerEventEmmiter.events.PREVIOUS_PAGE,
      this.previosPage
    )
  }

  private sort = async (sortMethod: sortMethod) => {
    this.winnerModel.changeTypeSortWinner(sortMethod)
    this.getWinners()
  }

  private nextPage = async () => {
    const isNext: boolean = this.winnerModel.nextPage()
    if (isNext) this.getWinners()
  }

  private previosPage = async () => {
    const isPrevious: boolean = this.winnerModel.previousPage()
    if (isPrevious) this.getWinners()
  }

  private deleteWinner = async (winnerId: number) => {
    const Isdeleted: boolean = await this.winnerModel.deleteWinner(winnerId)
    if (!Isdeleted) return
    const winners = await this.winnerModel.getWinners()
    if (!winners || (winners.winners.length === 0 && winners.totalCount > 1)) {
      this.previosPage()
    } else {
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

  private updateWinner = async (params: {
    car: Car
    time?: number
  }): Promise<void> => {
    const OldRecordWinner = await this.winnerModel.getWinner(params.car.id)
    if (OldRecordWinner) {
      const status = await this.winnerModel.updateWinner({
        time: String(params.time ? params.time : OldRecordWinner.time),
        wins: String(+OldRecordWinner.wins + 1),
        id: OldRecordWinner.id,
      })
      if (!status) return
      await this.getWinners()
      return
    }
    const createWinner: boolean = await this.winnerModel.createWinner({
      time: String(params.time),
      id: params.car.id,
    })
    if (createWinner) await this.getWinners()
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
