import BaseComponent from "../../../component/base-component"
import styles from "./panel.module.css"
import EventEmitter from "../../../utils/eventEmmiter"

const PAGE_TEMPLATE = "Page : "
const TOTAL_CATS_TEMPLATE = "Total : "

export default class PanelComponent extends BaseComponent<"article"> {
  private pageNumber!: BaseComponent

  private totalNumber!: BaseComponent

  constructor(private eventEmmiter: EventEmitter) {
    super({ tag: "article", className: styles.PanelComponent })
    this.initComponent()
    this.initListeners()
  }

  private initListeners = () => {
    this.eventEmmiter.on(this.eventEmmiter.events.DRAW_PANEL, this.drawPanel)
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
