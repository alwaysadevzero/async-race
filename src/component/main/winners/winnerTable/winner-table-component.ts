import styles from "./winner-table.module.css"
import BaseComponent from "../../../../utils/baseComponent"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"
import winnerEventEmmiter from "../../../../services/winners-eventEmmiter"

import machineSvg from "../../../../assets/machine.svg"
console.log(machineSvg)

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
    winnerEventEmmiter.on(winnerEventEmmiter.events.DRAW_CARS, this.updateTable)
    this.thead.node.addEventListener("click", (event) => {
      const target = event.target as HTMLElement

      if (target.innerText === "Wins") {
        garageEventEmmiter.emit(garageEventEmmiter.events.SORT_WIN)
      }

      if (target.innerText === "Time") {
        garageEventEmmiter.emit(garageEventEmmiter.events.SORT_TIME)
      }
    })
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
      new BaseComponent<"th">({
        tag: "th",
        content: header,
        parent: headerRow.node,
      })
    })
  }

  public updateTable = (data: Winner[]) => {
    this.tbody.node.innerHTML = ""

    data.forEach((winner, index) => {
      const tr = new BaseComponent<"tr">({
        tag: "tr",
        parent: this.tbody.node,
      })

      new BaseComponent<"td">({
        tag: "td",
        content: (index + 1).toString(),
        parent: tr.node,
      })

      const tdCar = new BaseComponent<"td">({
        tag: "td",
        parent: tr.node,
        className: styles.tdCar,
      })

      new BaseComponent<"td">({
        tag: "td",
        content: winner.name,
        parent: tr.node,
      })

      const machineIMG = new BaseComponent({
        tag: "div",
        parent: tdCar.node,
        className: styles.machineIMG,
        // attributes: { src: machineSvg },
      })
      console.log(winner.color)
      machineIMG.node.style.setProperty("--car-color", winner.color)

      new BaseComponent<"td">({
        tag: "td",
        content: winner.wins.toString(),
        className: styles.columWins,
        parent: tr.node,
      })

      new BaseComponent<"td">({
        tag: "td",
        content: winner.time.toString(),
        parent: tr.node,
      })
    })
  }
}
