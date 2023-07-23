import BaseComponent from "../../../utils/baseComponent"

import garageEventEmmiter from "../../../services/garage-eventEmmiter"
import  GaragePresenter   from "../../../presenter/garage-presenter"
import { GarageState } from "../../../interfaces/garage-state.interface"
import GarageModel from "../../../model/garage-model"

import RaceComponent from "./race/race-component"

const STATE: GarageState = {
  currentPage: 1,
  length: 7,
}

export class GarageComponent extends BaseComponent {

  constructor() {
    super({})
    this.initComponent()
    this.initDependinces()

  }

  private initDependinces = () => {
    const garageModel = new GarageModel(STATE)
    const garagePresenter = new GaragePresenter(garageModel)
  }

  private initComponent = () => {
    const race = new RaceComponent({parent: this.node})
  }
}
