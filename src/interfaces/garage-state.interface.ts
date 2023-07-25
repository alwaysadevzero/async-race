import { Race } from "../enums/enum-race-status"

export interface GarageState {
  currentPage: number
  carsLength: number
  pageLength: null | number
  generateLength: number
  activeCarsId: number[]
  raceStatus: Race
  winnerCarId: number | null
}
