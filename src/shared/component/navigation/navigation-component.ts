import BaseComponent from "../../../utils/baseComponent"
import styles from "./navigation.module.css"

export default class NavigationComponent extends BaseComponent<"article"> {
  private nextButton!: BaseComponent

  private previousButton!: BaseComponent

  constructor() {
    super({ tag: "article", className: styles.NavigationComponent })
    this.initComponent()
  }

  private initComponent = () => {
    this.previousButton = new BaseComponent<"button">({
      tag: "button",
      content: "left",
      parent: this.node,
    })

    this.previousButton = new BaseComponent<"button">({
      tag: "button",
      content: "right",
      parent: this.node,
    })
  }
}
