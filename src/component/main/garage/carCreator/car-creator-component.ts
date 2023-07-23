import styles from "./car-creator.module.css"
import BaseComponent from "../../../../utils/baseComponent"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"

export default class CarCreatorComponent extends BaseComponent<"article"> {
  constructor() {
    super({
      tag: "article",
      className: styles.creator,
    })
    this.initComponent()
  }

  private initComponent = () => {
    const wrapper = new BaseComponent({
      parent: this.node,
      className: styles.wrapper,
    })

    const button = new BaseComponent<"button">({
      tag: "button",
      content: "create",
      className: styles.button,
      parent: wrapper.node,
    })

    const color = new BaseComponent<"input">({
      tag: "input",
      parent: wrapper.node,
      className: styles.color,
      attributes: { type: "color" },
    })
    const input = new BaseComponent<"input">({
      tag: "input",
      parent: this.node,
      attributes: { maxlength: "20" },
    })
  }
}
