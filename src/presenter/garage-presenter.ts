import GarageModel from "../model/garage-model"
import garageEventEmmiter from "../services/garage-eventEmmiter"

export default class GaragePresenter {
  constructor(private garageModel: GarageModel) {
    this.garageModel = garageModel
    this.initListeners()
    this.updateCars()
  }

  private initListeners = () => {
    garageEventEmmiter.on(
      garageEventEmmiter.events.NEXT_PAGE,
      this.nextPage.bind(this)
    )
    garageEventEmmiter.on(
      garageEventEmmiter.events.PREVIOUS_PAGE,
      this.previosPage.bind(this)
    )
  }

  private async nextPage() {
    const isNext: boolean = this.garageModel.nextPage()
    if (isNext) {
      this.updateCars()
    }
  }

  private async previosPage() {
    const isPrevious: boolean = this.garageModel.previousPage()
    if (isPrevious) {
      this.updateCars()
    }
  }

  private async updateCars() {
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
