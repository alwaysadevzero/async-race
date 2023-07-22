import { Pages } from "../enums/enum-pages"
import BaseComponent from "../utils/baseComponent"

export interface Route {
  name: Pages
  component: () => Promise<BaseComponent>
}
