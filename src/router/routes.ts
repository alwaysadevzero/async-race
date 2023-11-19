import { Route } from "./interface-route"
import { Pages } from "../enums/enum-pages"

export const Routes: Route[] = [
  {
    name: Pages.GARAGE,
    component: async () => {
      const { GarageComponent } = await import(
        "../component/main/garage/garagePage-component"
      )
      return new GarageComponent()
    },
  },
  {
    name: Pages.WINERS,
    component: async () => {
      const { WinnersComponent } = await import(
        "../component/main/winners/winnersPage-component"
      )
      return new WinnersComponent()
    },
  },
]
