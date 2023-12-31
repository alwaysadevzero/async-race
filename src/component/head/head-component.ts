import BaseComponent from "../base-component"
import { Pages } from "../../enums/enum-pages"
import styles from "./head.module.css"
import WinnerModalComponent from "./modal/winner-modal-component"

export class HeadComponent extends BaseComponent<"header"> {
  constructor() {
    super({ tag: "header", className: `${styles.container}` })
    this.initComponent()
  }

  private initComponent = () => {
    const title = new BaseComponent({
      tag: "h1",
      content: "Async Race",
      parent: this.node,
      className: styles.title,
    })

    const buttonsWrapper = new BaseComponent({
      tag: "nav",
      className: styles.wrapper,
      parent: this.node,
    })

    const garageButton = new BaseComponent({
      tag: "a",
      parent: buttonsWrapper.node,
      content: Pages.GARAGE,
      attributes: { role: "button", href: `#${Pages.GARAGE}` },
    })

    const winnersButtonButton = new BaseComponent({
      tag: "a",
      parent: buttonsWrapper.node,
      content: Pages.WINERS,
      attributes: { role: "button", href: `#${Pages.WINERS}` },
    })

    const modal = new WinnerModalComponent()
    this.append(modal)
  }
}
