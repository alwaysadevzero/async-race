import BaseComponent from "../../../utils/baseComponent"
import styles from "./navigation.module.css"
import EventEmitter from "../../../utils/eventEmmiter"

export default class NavigationComponent extends BaseComponent<"article"> {
  private nextButton!: BaseComponent

  private previousButton!: BaseComponent

  constructor(private eventEmmiter: EventEmitter) {
    super({ tag: "article", className: styles.NavigationComponent })
    this.eventEmmiter = eventEmmiter
    this.initComponent()
    this.initListeners()
  }

  private initListeners = () => {
    this.nextButton.addListener("click", () =>
      this.eventEmmiter.emit(this.eventEmmiter.events.NEXT_PAGE)
    )
    this.previousButton.addListener("click", () =>
      this.eventEmmiter.emit(this.eventEmmiter.events.PREVIOUS_PAGE)
    )
  }

  private initComponent = () => {
    this.previousButton = new BaseComponent<"button">({
      tag: "button",
      content: "left",
      parent: this.node,
    })

    this.nextButton = new BaseComponent<"button">({
      tag: "button",
      content: "right",
      parent: this.node,
    })
  }
}
