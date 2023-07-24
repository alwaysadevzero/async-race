import styles from "./car-creator.module.css"
import BaseComponent from "../../../../utils/baseComponent"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"

export default class CarCreatorComponent extends BaseComponent<"article"> {
  private color!: BaseComponent
  private button!: BaseComponent
  private input!: BaseComponent
  constructor() {
    super({
      tag: "article",
      className: styles.creator,
    })
    this.initComponent()
    this.initListeners()
  }

  private initListeners = () => {
    this.button.addListener("click", () => {
      const carName = (this.input.node as HTMLInputElement).value
      if (!carName) return
      const carColor = (this.color.node as HTMLInputElement).value
      garageEventEmmiter.emit(garageEventEmmiter.events.CREATE_CAR, {
        carName,
        carColor,
      })
    })
  }

  private initComponent = () => {
    const wrapper = new BaseComponent({
      parent: this.node,
      className: styles.wrapper,
    })

    this.button = new BaseComponent<"button">({
      tag: "button",
      content: "create",
      className: styles.button,
      parent: wrapper.node,
    })

    this.color = new BaseComponent<"input">({
      tag: "input",
      parent: wrapper.node,
      className: styles.color,
      attributes: { type: "color" },
    })
    this.input = new BaseComponent<"input">({
      tag: "input",
      parent: this.node,
      attributes: { maxlength: "20" },
    })
  }
}
