import "./styles.css"
import "./pico.min.css"
import { HeadComponent } from "./component/head/head-component"
import { MainComponent } from "./component/main/main-component"
import { FooterComponent } from "./component/footer/footer"
import Router from "./router/router"

class App {
  constructor() {
    const header = new HeadComponent()
    const main = new MainComponent()
    const footer = new FooterComponent()

    const router = new Router(main.node)
    document.body.append(header.node, main.node, footer.node)
  }
}

// eslint-disable-next-line no-new
new App()
