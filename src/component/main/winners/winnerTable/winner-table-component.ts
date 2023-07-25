import styles from "./winner-table.module.css"
import BaseComponent from "../../../../utils/baseComponent"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"

export default class WinnerComponent extends BaseComponent<"table"> {
  private thead: BaseComponent<"thead">
  private tbody: BaseComponent<"tbody">

  constructor() {
    super({ tag: "table", className: styles.tableWin })
    this.initComponent()
    this.initListeners()
  }

  private initListeners = () => {
    const winsHeader = this.thead.node.querySelector("#wins")
    const timeHeader = this.thead.node.querySelector("#time")

    if (winsHeader) {
      winsHeader.addEventListener("click", () => {
        garageEventEmmiter.emit(garageEventEmmiter.events.SORT_WIN)
      })
    }

    if (timeHeader) {
      timeHeader.addEventListener("click", () => {
        garageEventEmmiter.emit(garageEventEmmiter.events.SORT_TIME)
      })
    }
  }

  private initComponent = () => {
    this.thead = new BaseComponent<"thead">({
      tag: "thead",
      parent: this.node,
    })

    this.tbody = new BaseComponent<"tbody">({
      tag: "tbody",
      parent: this.node,
    })

    const headerRow = new BaseComponent<"tr">({
      tag: "tr",
      parent: this.thead.node,
    })

    const headers = ["Number", "Car", "Name", "Wins", "Best time (seconds)"]
    headers.forEach((header) => {
      const th = new BaseComponent<"th">({
        tag: "th",
        content: header,
        parent: headerRow.node,
      })

      if (header === "Wins") {
        th.node.classList.add(styles.columWins)
        th.node.id = "wins" // Setting id for easier event listener addition
      }

      if (header === "Best time (seconds)") {
        th.node.classList.add(styles.recordColumn)
        th.node.id = "time" // Setting id for easier event listener addition
      }
    })
  }
}
