import "./styles.css"
import Router from "./router/router"
import { HeadComponent } from "./component/head/head-component"

class App {
  constructor() {
    const router = new Router()
    const header = new HeadComponent()
    const main = document.createElement("main")
    document.body.append(header.node)
    main.classList.add("container")
  }
}

// eslint-disable-next-line no-new
new App()
