import Winner from "./winner.interface"

export default interface GetWinners {
  winners: Winner[]
  totalCount: number
  page: number
}
