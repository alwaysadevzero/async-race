import { Car } from "../interfaces/car.interface"
import { EngineStatus } from "../enums/enum-engine-status"
import { Trace } from "../interfaces/trace.interface"
import Winner from "../interfaces/winner.interface"
import GetWinners from "../interfaces/get-winners.interface"

const BASE_URL = "http://127.0.0.1:3000"

export default class RaceApi {
  public async getCars(page: number, limit: number) {
    const response = await fetch(
      `${BASE_URL}/garage?_page=${page || ""}&_limit=${limit || ""}`
    )
    const cars: Car[] = await response.json()
    const totalCount = response.headers.get("X-Total-Count")
    return { cars, totalCount, page }
  }

  public async getCar(id: number) {
    const response = await fetch(`${BASE_URL}/garage/${id}`)
    if (response.status === 404) throw new Error("Car not found")
    return response.json()
  }

  public async createCar(name: string, color: string): Promise<number> {
    const car = {
      name,
      color,
    }

    const response = await fetch(`${BASE_URL}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
    return response.status
  }

  public async deleteCar(id: number): Promise<number> {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: "DELETE",
    })
    if (response.status === 404) throw new Error("Car not found")
    return response.status
  }

  public async updateCar(car: Car): Promise<Omit<Car, "id"> | undefined> {
    const carObj = {
      name: car.name,
      color: car.color,
    }
    const response = await fetch(`${BASE_URL}/garage/${car.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carObj),
    })
    try {
      if (response.status === 404) {
        throw new Error("Car not found")
      }
    } catch {
      return undefined
    }

    const updatedCar = await response.json()
    if (!updatedCar) {
      return undefined
    }

    return updatedCar
  }

  public async startEngine(id: number): Promise<Trace | undefined> {
    const response = await fetch(
      `${BASE_URL}/engine?id=${id}&status=${EngineStatus.START}`,
      {
        method: "PATCH",
      }
    )
    if (response.status === 200) return response.json()
    try {
      if (response.status === 404) throw new Error("Car not found")
      if (response.status === 400)
        throw new Error("Car with such id was not found in the garage.")
    } catch {
      console.warn("Failed start engine")
    }
    return undefined
  }

  public async stopEngine(id: number): Promise<boolean> {
    const response = await fetch(
      `${BASE_URL}/engine?id=${id}&status=${EngineStatus.STOP}`,
      {
        method: "PATCH",
      }
    )
    if (response.status === 200) return true
    try {
      if (response.status === 404) throw new Error("Car not found")
      if (response.status === 400)
        throw new Error("Car with such id was not found in the garage.")
    } catch {
      console.warn("Failed stop engine")
    }
    return false
  }

  public async driveEngine(id: number): Promise<boolean> {
    const response = await fetch(
      `${BASE_URL}/engine?id=${id}&status=${EngineStatus.DRIVE}`,
      {
        method: "PATCH",
      }
    )
    if (response.status === 200) return true
    if (response.status === 500) return false
    try {
      if (response.status === 404) throw new Error("Car not found")
      if (response.status === 400)
        throw new Error("Car with such id was not found in the garage.")
    } catch {
      console.warn("Failed drive car")
    }
    return false
  }

  public async getWinners(
    page: string,
    limit: string,
    sort: string,
    order: string
  ): Promise<Omit<GetWinners, "page"> | undefined> {
    const queryParams = new URLSearchParams({
      page,
      limit,
      sort,
      order,
    })
    const response = await fetch(`${BASE_URL}/winners?${queryParams}`)
    if (!(response.status === 200)) return
    const winners = await response.json()
    const totalCount = winners.length
    return { winners, totalCount }
  }

  public async getWinner(id: number) {
    const response = await fetch(`${BASE_URL}/winners/${id}`)
    if (response.status === 404) throw new Error("Winner not found")
    return response.json()
  }

  public async createWinner(winner: number) {
    const response = await fetch(`${BASE_URL}/winners`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(winner),
    })
    return response.json()
  }

  public async deleteWinner(id: number) {
    const response = await fetch(`${BASE_URL}/winners/${id}`, {
      method: "DELETE",
    })
    if (response.status === 404) throw new Error("Winner not found")
    return response.json()
  }

  public async updateWinner(id: number, winner: number) {
    const response = await fetch(`${BASE_URL}/winners/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(winner),
    })
    if (response.status === 404) throw new Error("Winner not found")
    return response.json()
  }
}
