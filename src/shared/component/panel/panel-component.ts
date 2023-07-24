import BaseComponent from "../../../utils/baseComponent"
import styles from "./panel.module.css"
import garageEventEmmiter from "../../../services/garage-eventEmmiter"

const PAGE_TEMPLATE = "Page : "
const TOTAL_CATS_TEMPLATE = "Total : "

export default class PanelComponent extends BaseComponent<"article"> {
  private pageNumber!: BaseComponent

  private totalNumber!: BaseComponent

  constructor() {
    super({ tag: "article", className: styles.PanelComponent })
    this.initComponent()
    this.initListeners()
  }

  private initListeners = () => {
    garageEventEmmiter.on(garageEventEmmiter.events.DRAW_PANEL, this.drawPanel)
  }

  private drawPanel = (params: { total: string; page: number }) => {
    this.pageNumber.setContent(PAGE_TEMPLATE + params.page)
    this.totalNumber.setContent(TOTAL_CATS_TEMPLATE + params.total)
  }

  private initComponent = () => {
    const nameWrapper = new BaseComponent({
      parent: this.node,
    })

    this.pageNumber = new BaseComponent<"h2">({
      tag: "h2",
      content: PAGE_TEMPLATE,
      parent: nameWrapper.node,
    })
    this.totalNumber = new BaseComponent<"h2">({
      tag: "h2",
      content: TOTAL_CATS_TEMPLATE,
      parent: nameWrapper.node,
    })
  }
}
