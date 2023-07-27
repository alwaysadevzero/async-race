import styles from "./winner-modal.module.css"
import BaseComponent from "../../../utils/baseComponent"
import GarageEventEmmiter from "../../../services/garage-eventEmmiter"
import { Car } from "../../../interfaces/car.interface"

export default class WinnerModalComponent extends BaseComponent {
  private modal!: BaseComponent

  private modelContent!: BaseComponent

  private carNameWinner!: BaseComponent

  constructor() {
    super({ className: styles.modal })
    this.configureView()
    this.initListeners()
  }

  private initListeners = () => {
    this.modelContent.addListener("click", () => {
      this.disableModal()
    })

    this.modal.addListener("click", (event) => {
      if (event?.target === this.modal.node) this.disableModal()
    })
    GarageEventEmmiter.on(
      GarageEventEmmiter.events.DRAW_WINNER,
      this.drawWinner
    )
  }

  private drawWinner = (params: { car: Car; time: number }) => {
    params
    this.carNameWinner.setContent(params.car.name)
    this.enableModal()
  }

  private disableModal = () => {
    document.body.style.overflow = ""
    this.modal.removeAttributes("open")
    this.setClass(styles.open, false)
  }

  private enableModal = () => {
    document.body.style.overflow = "hidden"
    this.modal.setAttributes({ open: "" })
    this.setClass(styles.open, true)
  }

  private configureView = () => {
    this.modal = new BaseComponent({
      tag: "dialog",
      className: styles.modal,
      parent: this.node,
      attributes: { id: "modal" },
    })

    const article = new BaseComponent({
      tag: "article",
      className: styles.article,
      parent: this.modal.node,
    })
    this.modelContent = new BaseComponent({
      tag: "a",
      parent: article.node,
      attributes: {
        "aria-label": "Close",
        class: "close",
        "data-target": "modal",
      },
    })

    const congratulation = new BaseComponent({
      tag: "h2",
      content: "Congratulation!",
      parent: this.modelContent.node,
    })

    this.carNameWinner = new BaseComponent({
      tag: "h3",
      className: styles.carNameWinner,
      parent: this.modelContent.node,
    })

    const timeWrapper = new BaseComponent({
      parent: this.modelContent.node,
    })
  }
}
