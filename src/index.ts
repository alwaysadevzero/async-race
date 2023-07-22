import "./styles.css"
import { HeadComponent } from "./component/head/head-component"
import { MainComponent } from "./component/main/main-component"
import Router from "./router/router"

class App {
  constructor() {
    const header = new HeadComponent()
    const main = new MainComponent()

    const router = new Router(main.node)
    document.body.append(header.node, main.node)
  }
}

// eslint-disable-next-line no-new
new App()
