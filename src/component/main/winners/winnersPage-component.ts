import styles from "./winners.module.css"
import BaseComponent from "../../base-component"
import PanelComponent from "../../../shared/component/panel/panel-component"
import NavigationComponent from "../../../shared/component/navigation/navigation-component"
import winnerEventEmmiter from "../../../services/winners-eventEmmiter"
import WinTableComponent from "./winnerTable/winner-table-component"

import WinnerPresenter from "../../../presenter/winners-presenter"
import WinnerModel from "../../../model/winner-model"

export class WinnersComponent extends BaseComponent {
  constructor() {
    super({ className: styles.WinnersComponent })
    this.initComponent()
    this.initDependinces()
  }

  private initDependinces = () => {
    const winnerModel = new WinnerModel()
    const winnerPresenter = new WinnerPresenter(winnerModel)
  }

  private initComponent = () => {
    const wrapper = new BaseComponent({
      parent: this.node,
      className: styles.wrapper,
    })
    const panel = new PanelComponent(winnerEventEmmiter)
    const navigation = new NavigationComponent(winnerEventEmmiter)

    const winnerTable = new WinTableComponent()
    wrapper.append(panel, navigation, winnerTable)
  }
}
