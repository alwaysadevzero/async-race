import winnerEventEmmiter from "../services/winners-eventEmmiter"
import WinnerModel from "../model/winner-model"

export default class WinnerPresenter {
  constructor(private winnerModerl: WinnerModel) {
    this.getWinners()
  }

  private getWinners = async () => {
    const winners = await this.winnerModerl.getWinners()
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
