import RaceApi from "../services/race-api"

interface WinnerState {
  sortMethod: "id" | "wins" | "time" // метод сортировки
  sortOrder: "ASC" | "DESC" // порядок сортировки
  currentPage: number // текущая страница
  carsPerPage: number // количество машин на странице
  totalCars: number // общее количество машин
  totalPages: number // общее количество страниц
}

const initialState: WinnerState = {
  sortMethod: "id",
  sortOrder: "ASC",
  currentPage: 1,
  carsPerPage: 10,
  totalCars: 0,
  totalPages: 0,
}

export default class WinnerModel {}
