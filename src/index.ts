import "./styles.css"
import Router from "./router/router"

class App {
  constructor() {
    const router = new Router()
    const main = document.createElement("main")
    document.body.appendChild(main)
    main.classList.add("container")
  }
}

// eslint-disable-next-line no-new
new App()
