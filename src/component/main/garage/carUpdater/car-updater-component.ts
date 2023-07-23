import styles from "./car-updater.module.css"
import BaseComponent from "../../../../utils/baseComponent"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"

export default class CarUpdaterComponent extends BaseComponent<"article"> {
  constructor() {
    super({ tag: "article", className: styles.updater })
    this.initComponent()
  }

  private initComponent = () => {
    const input = new BaseComponent<"input">({
      tag: "input",
      parent: this.node,
      attributes: { maxlength: "20" },
    })

    const wrapper = new BaseComponent({
      parent: this.node,
      className: styles.wrapper,
    })
    const color = new BaseComponent<"input">({
      tag: "input",
      parent: wrapper.node,
      className: styles.color,
      attributes: { type: "color" },
    })
    const button = new BaseComponent<"button">({
      tag: "button",
      content: "update",
      className: styles.button,
      parent: wrapper.node,
    })
  }
}
