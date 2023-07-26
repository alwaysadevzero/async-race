import { Race } from "../enums/enum-race-status"
import { Car } from "./car.interface"

export interface GarageState {
  currentPage: number
  carsLength: number
  pageLength: null | number
  generateLength: number
  activeCarsId: number[]
  raceStatus: Race
  winnerCar: Car | null
}
