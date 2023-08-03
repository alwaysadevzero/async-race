import { Pages } from "../enums/enum-pages"
import BaseComponent from "../component/base-component"

export interface Route {
  name: Pages
  component: () => Promise<BaseComponent>
}
