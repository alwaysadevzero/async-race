import styles from "./winner-table.module.css"
import BaseComponent from "../../../../utils/baseComponent"
import garageEventEmmiter from "../../../../services/garage-eventEmmiter"

// Интерфейс для данных автомобиля, допущение на основе предоставленной информации
interface CarData {
  color: string
  name: string
  wins: number
  time: number
}

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
        th.node.id = "wins"
      }

      if (header === "Best time (seconds)") {
        th.node.classList.add(styles.recordColumn)
        th.node.id = "time"
      }
    })
  }

  public updateTable = (data: CarData[]) => {
    this.tbody.node.innerHTML = "" // очищаем tbody

    data.forEach((car, index) => {
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
      })

      const carDiv = new BaseComponent<"div">({
        tag: "div",
        className: styles.carWin,
        parent: tdCar.node,
      })

      const carSvg = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      )
      carSvg.setAttribute("class", styles.car)
      carSvg.setAttribute("style", `fill: ${car.color}`)
      carSvg.setAttribute("width", "70")
      carDiv.node.appendChild(carSvg)

      const carUse = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "use"
      )
      carUse.setAttribute("href", "#car")
      carUse.setAttribute("width", "50")
      carUse.setAttribute("height", "30")
      carSvg.appendChild(carUse)

      new BaseComponent<"td">({
        tag: "td",
        content: car.name,
        parent: tr.node,
      })

      new BaseComponent<"td">({
        tag: "td",
        content: car.wins.toString(),
        className: styles.columWins,
        parent: tr.node,
      })

      new BaseComponent<"td">({
        tag: "td",
        content: car.time.toString(),
        parent: tr.node,
      })
    })
  }
}
