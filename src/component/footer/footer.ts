import BaseComponent from "../base-component"
import styles from "./footer.module.css"

const LINKS = [
  { href: "https://rs.school/", content: "RS School" },
  { href: "https://github.com/alwaysadevzero", content: "Author" },
  {
    href: "https://github.com/rolling-scopes-school/tasks/blob/master/tasks/async-race.md",
    content: "ASYNC RACE 2023",
  },
]

export class FooterComponent extends BaseComponent<"footer"> {
  constructor() {
    super({
      tag: "footer",
      className: styles.footer,
    })
    this.initComponent()
  }

  private initComponent = () => {
    const nav = new BaseComponent<"nav">({
      tag: "nav",
      attributes: { "aria-label": "breadcrumb" },
      parent: this.node,
      className: styles.wrapper,
    })

    const ul = new BaseComponent<"ul">({
      tag: "ul",
      parent: nav.node,
    })

    const links = LINKS.map((link) => {
      const li = new BaseComponent<"li">({ tag: "li", parent: ul.node })
      const a = new BaseComponent<"a">({
        tag: "a",
        parent: li.node,
        attributes: { href: link.href },
        content: link.content,
        className: "contrast",
      })
      return li
    })
  }
}
