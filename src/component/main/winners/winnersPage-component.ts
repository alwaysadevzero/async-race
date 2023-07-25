import styles from "./winners.module.css"
import BaseComponent from "../../../utils/baseComponent"
import PanelComponent from "../../../shared/component/panel/panel-component"
import NavigationComponent from "../../../shared/component/navigation/navigation-component"
import winnerEventEmmiter from "../../../services/winners-eventEmmiter"
import WinTableComponent from "./winnerTable/winner-table-component"

export class WinnersComponent extends BaseComponent {
  constructor() {
    super({ className: styles.WinnersComponent })
    this.initComponent()
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
