import GarageModel from "../model/garage-model"
import garageEventEmmiter from "../services/garage-eventEmmiter"

export default class GaragePresenter {

  constructor(private garageModel: GarageModel) {
    this.garageModel = garageModel
    // this.initListeners()
    this.updateCars()
  }

  private async updateCars(){
    const data = await this.garageModel.getCars()
    if (data)
    garageEventEmmiter.emit(garageEventEmmiter.events.DRAW_CARS, data.cars)
  }
}
