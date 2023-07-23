import BaseComponent from "../../../utils/baseComponent"
import styles from "./panel.module.css"

const PAGE_TEMPLATE = "Page : "
const TOTAL_CATS_TEMPLATE = "Total :"

export default class PanelComponent extends BaseComponent<"article"> {
  private pageNumber!: BaseComponent

  private totalNumber!: BaseComponent

  constructor() {
    super({ tag: "article", className: styles.PanelComponent })
    this.initComponent()
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
