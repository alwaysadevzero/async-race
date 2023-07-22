import BaseComponent from "../../utils/baseComponent"
import { Pages } from "../../enums/enum-pages"
import styles from "./head.module.css"

export class HeadComponent extends BaseComponent {
  private garageButton!: BaseComponent

  private winnersButtonButton!: BaseComponent

  constructor() {
    super({ className: "container" })
    this.setClass(styles.container)
    this.initComponent()
  }

  private initComponent() {
    const title = new BaseComponent({
      tag: "h1",
      content: "Async Race",
      parent: this.node,
      className: styles.title,
    })

    const buttonsWrapper = new BaseComponent({
      className: styles.wrapper,
      parent: this.node,
    })

    this.garageButton = new BaseComponent({
      tag: "button",
      parent: buttonsWrapper.node,
      content: "garage",
    })

    this.winnersButtonButton = new BaseComponent({
      tag: "button",
      parent: buttonsWrapper.node,
      content: "winners",
    })
  }
}
