import BaseComponent from "../../../utils/baseComponent"
import EventEmitter from "../../../utils/eventEmmiter"
import GaragePresenter from "../../../presenter/garage-presenter"

const State = {
  currentPage: 1,
}

export class GarageComponent extends BaseComponent {
  constructor() {
    super({})
    this.initDependinces()
  }

  private initDependinces = () => {
    const eventEmmiter = new EventEmitter()
    const racePresenter = new GaragePresenter(eventEmmiter)
  }
}
