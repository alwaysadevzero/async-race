import { Car } from "../interfaces/car.interface"
import { EngineStatus } from "../enums/enum-engine-status"
import { Trace } from "../interfaces/trace.interface"
import Winner from "../interfaces/winner.interface"
import HttpStatusCode from "../enums/http-status-code"

const BASE_URL = "http://127.0.0.1:3000"

export default class RaceApi {
  private async fetchApi(url: string, options?: RequestInit) {
    const response = await fetch(url, options)
    return response
  }

  public async getCars(
    page: number,
    limit: number
  ): Promise<{ cars: Car[]; totalCount: string | null; page: number }> {
    const response = await this.fetchApi(
      `${BASE_URL}/garage?_page=${page || ""}&_limit=${limit || ""}`
    )
    const totalCount = response.headers.get("X-Total-Count")
    const cars = await response.json()
    return { cars, totalCount, page }
  }

  public async getCar(id: number): Promise<Car> {
    const response = await this.fetchApi(`${BASE_URL}/garage/${id}`)
    return response.json()
  }

  public async createCar(name: string, color: string): Promise<HttpStatusCode> {
    const response = await this.fetchApi(`${BASE_URL}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, color }),
    })
    return response.status
  }

  public async deleteCar(id: number): Promise<HttpStatusCode> {
    const response = await this.fetchApi(`${BASE_URL}/garage/${id}`, {
      method: "DELETE",
    })
    return response.status
  }

  public async updateCar(car: Car): Promise<Car> {
    const response = await this.fetchApi(`${BASE_URL}/garage/${car.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: car.name, color: car.color }),
    })
    return response.json()
  }

  public async startEngine(id: number): Promise<Trace> {
    const response = await this.fetchApi(
      `${BASE_URL}/engine?id=${id}&status=${EngineStatus.START}`,
      {
        method: "PATCH",
      }
    )
    return response.json()
  }

  public async stopEngine(id: number): Promise<HttpStatusCode> {
    const response = await this.fetchApi(
      `${BASE_URL}/engine?id=${id}&status=${EngineStatus.STOP}`,
      {
        method: "PATCH",
      }
    )
    return response.status
  }

  public async driveEngine(id: number): Promise<HttpStatusCode> {
    const response = await this.fetchApi(
      `${BASE_URL}/engine?id=${id}&status=${EngineStatus.DRIVE}`,
      {
        method: "PATCH",
      }
    )
    return response.status
  }

  public async getWinners(
    page: string,
    limit: string,
    sort: string,
    order: string
  ): Promise<{ winners: Winner[]; totalCount: string | null }> {
    const response = await this.fetchApi(
      `${BASE_URL}/winners?_page=${page || ""}&_limit=${limit || ""}&_sort=${
        sort || ""
      }&_order=${order || ""}`
    )
    const winners = await response.json()
    const totalCount = response.headers.get("X-Total-Count")

    return { winners, totalCount }
  }

  public async getWinner(id: number): Promise<any> {
    const response = await fetch(`${BASE_URL}/winners/${id}`)
    return response
  }

  public async createWinner(
    winner: Omit<Winner, "wins">
  ): Promise<HttpStatusCode> {
    const queryParams = { ...winner, wins: 1 }
    const response = await this.fetchApi(`${BASE_URL}/winners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryParams),
    })
    return response.status
  }

  public async deleteWinner(id: number): Promise<HttpStatusCode> {
    const response = await this.fetchApi(`${BASE_URL}/winners/${id}`, {
      method: "DELETE",
    })
    return response.status
  }

  public async updateWinner(winner: Winner): Promise<HttpStatusCode> {
    const response = await this.fetchApi(`${BASE_URL}/winners/${winner.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(winner),
    })
    return response.status
  }
}
