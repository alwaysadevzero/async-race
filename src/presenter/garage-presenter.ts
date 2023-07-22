import EventEmitter from "../utils/eventEmmiter"

export default class RacePresenter {
  constructor(private eventEmmiter: EventEmitter) {
    this.eventEmmiter = eventEmmiter
  }
}
