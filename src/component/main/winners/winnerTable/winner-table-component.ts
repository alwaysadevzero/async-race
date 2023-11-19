import styles from "./winner-table.module.css"
import BaseComponent from "../../../base-component"
import winnerEventEmmiter from "../../../../services/winners-eventEmmiter"

import machineSvg from "../../../../assets/machine.svg"
import { sortMethod } from "../../../../enums/enum-sort-method"

interface Winner {
  color: string
  name: string
  wins: number
  time: number
}

const HEADERS = ["Number", "Car", "Name", "Wins", "Time"]

export default class WinnerComponent extends BaseComponent<"table"> {
  private thead: BaseComponent<"thead">

  private tbody: BaseComponent<"tbody">

  constructor() {
    super({ tag: "table", className: styles.tableWin })
    this.initComponent()
    this.initListeners()
  }

  private initListeners = () => {
    winnerEventEmmiter.on(winnerEventEmmiter.events.DRAW_CARS, this.drawTable)
    this.thead.node.addEventListener("click", (event) => {
      const target = event.target as HTMLElement

      let sort
      switch (target.innerText) {
        case "Wins":
          sort = sortMethod.WIN
          break
        case "Time":
          sort = sortMethod.TIME
          break
        default:
          break
      }
      winnerEventEmmiter.emit(winnerEventEmmiter.events.SORT, sort)
    })
  }

  private drawTable = (data: Winner[]) => {
    const table = this.genRows(data)
    this.tbody.node.innerHTML = ""
    this.tbody.append(...table)
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

    HEADERS.forEach((header) => {
      const th = new BaseComponent<"th">({
        tag: "th",
        content: header,
        parent: headerRow.node,
      })
    })
  }

  private genRows = (data: Winner[]) => {
    return data.map((winner, index) => {
      const row = new BaseComponent<"tr">({
        tag: "tr",
      })
      const count = new BaseComponent<"td">({
        tag: "td",
        content: (index + 1).toString(),
        parent: row.node,
      })
      const tdCar = new BaseComponent<"td">({
        tag: "td",
        parent: row.node,
        className: styles.tdCar,
      })
      const name = new BaseComponent<"td">({
        tag: "td",
        content: winner.name,
        parent: row.node,
      })
      const machineIMG = new BaseComponent({
        tag: "div",
        parent: tdCar.node,
        className: styles.machineIMG,
      })
      machineIMG.node.style.setProperty("--car-color", winner.color)
      const wins = new BaseComponent<"td">({
        tag: "td",
        content: winner.wins.toString(),
        className: styles.columWins,
        parent: row.node,
      })
      const time = new BaseComponent<"td">({
        tag: "td",
        content: winner.time.toString(),
        parent: row.node,
      })
      return row
    })
  }
}
