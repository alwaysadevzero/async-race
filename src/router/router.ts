import { Routes } from "./routes"
import { Route } from "./interface-route"
import { Pages } from "../enums/enum-pages"
import BaseComponent from "../component/base-component"

interface ActiveRoute {
  name: Pages
  component: BaseComponent
}

export default class Router {
  private activeRoutes: ActiveRoute[] = []

  private defaultPage = Pages.GARAGE

  private wrapper: HTMLElement

  constructor(wrapper: HTMLElement) {
    this.wrapper = wrapper
    window.addEventListener("hashchange", this.handleHashChange)
    this.handleHashChange()
  }

  private handleHashChange = async () => {
    if (!window.location.hash) {
      window.location.hash = `#${this.defaultPage}`
    }

    const hash: Pages =
      (window.location.hash.slice(1) as Pages) || this.defaultPage

    let loadedRoute = this.activeRoutes.find((r) => r.name === hash)
    if (!loadedRoute) {
      const route = Routes.find((r) => r.name === hash)
      if (route) {
        const component = await this.loadRoute(route)
        loadedRoute = { name: route.name, component }
        this.activeRoutes.push(loadedRoute)
      } else {
        return
      }
    }
    this.onHashChange(loadedRoute)
  }

  private loadRoute = (route: Route): Promise<BaseComponent> => {
    return route.component().then((component): BaseComponent => {
      return component
    })
  }

  private onHashChange = (route: ActiveRoute): void => {
    this.wrapper.innerHTML = ""
    if (route.component.node) {
      this.wrapper.appendChild(route.component.node)
    }
  }
}
