import styles from "./car-control.module.css"
import BaseComponent from "../../../../../../utils/baseComponent"

export default class CarControlComponent extends BaseComponent {
  private buttonStart!: BaseComponent

  private buttonStop!: BaseComponent

  private buttonEdit!: BaseComponent

  private buttonReset!: BaseComponent

  constructor() {
    super({ className: styles.CarControlComponent })
    this.initComponent()
  }

  private initComponent = () => {
    this.buttonStart = new BaseComponent<"button">({
      tag: "button",
      content: "start",
      parent: this.node,
    })
    this.buttonStop = new BaseComponent<"button">({
      tag: "button",
      content: "stop",
      parent: this.node,
    })
    this.buttonEdit = new BaseComponent<"button">({
      tag: "button",
      content: "edit",
      parent: this.node,
    })
    this.buttonReset = new BaseComponent<"button">({
      tag: "button",
      content: "reset",
      parent: this.node,
    })
  }
}
