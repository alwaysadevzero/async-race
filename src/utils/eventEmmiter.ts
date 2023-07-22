import { Events } from "../enums/enum-events"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Listener = (args: any) => void

export default class EventEmitter {
  private listeners: Record<string, Listener[]> = {}

  public events: typeof Events = Events

  public on(event: Events, listener: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(listener)
  }

  public off(event: Events, listener: Listener): void {
    if (!this.listeners[event]) return
    const callbackIndex = this.listeners[event].indexOf(listener)
    if (callbackIndex >= 0) {
      this.listeners[event].splice(callbackIndex, 1)
    }
  }

  public emit(event: Events, data?: unknown): void {
    if (!this.listeners[event]) return
    this.listeners[event].forEach((listener) => listener(data))
  }
}
