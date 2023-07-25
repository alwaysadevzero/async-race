import winnerEventEmmiter from "../services/winners-eventEmmiter"
import Winner from "../interfaces/winner.interface"
import WinnerModel from "../model/winner-model"

export default class GaragePresenter {
  constructor(private winnerModerl: WinnerModel) {
    // this.initListeners()
    this.updateWinners()
  }

}
