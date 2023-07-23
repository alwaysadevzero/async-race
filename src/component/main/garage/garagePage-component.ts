import styles from "./garagePage.module.css"
import BaseComponent from "../../../utils/baseComponent"

import GaragePresenter from "../../../presenter/garage-presenter"
import { GarageState } from "../../../interfaces/garage-state.interface"
import GarageModel from "../../../model/garage-model"

import RaceComponent from "./race/race-component"
import CarCreatorComponent from "./carCreator/car-creator-component"
import CarUpdaterComponent from "./carUpdater/car-updater-component"
import RaceControlsComponent from "./raceControls/race-controls-component"

import PanelComponent from "../../../shared/component/panel/panel-component"
import NavigationComponent from "../../../shared/component/navigation/navigation-component"

const STATE: GarageState = {
  currentPage: 1,
  length: 7,
}

export class GarageComponent extends BaseComponent<"article"> {
  constructor() {
    super({ className: styles.GarageComponent })
    this.initComponent()
    this.initDependinces()
  }

  private initDependinces = () => {
    const garageModel = new GarageModel(STATE)
    const garagePresenter = new GaragePresenter(garageModel)
  }

  private initComponent = () => {
    const wrapper = new BaseComponent({
      parent: this.node,
      className: styles.wrapper,
    })
    const panel = new PanelComponent()
    wrapper.append(panel)
    const controlsWrapper = new BaseComponent({
      parent: wrapper.node,
      className: styles.controlsWrapper,
    })

    const raceControls = new RaceControlsComponent()
    const navigation = new NavigationComponent()
    controlsWrapper.append(raceControls, navigation)

    const creatorWrapper = new BaseComponent({
      parent: wrapper.node,
      className: styles.creatorWrapper,
    })
    const carCreator = new CarCreatorComponent()
    const carUpdater = new CarUpdaterComponent()
    creatorWrapper.append(carCreator, carUpdater)

    const race = new RaceComponent()
    this.append(race.node)
  }
}
