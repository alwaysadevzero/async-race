const BASE_URL = "http://127.0.0.1:3000"

export default class RaceApi {
  public async getCars(page: number, limit: number) {
    const response = await fetch(
      `${BASE_URL}/garage?_page=${page || ""}&_limit=${limit || ""}`
    )
    const data = await response.json()
    const totalCount = response.headers.get("X-Total-Count")
    return { data, totalCount }
  }

  public async getCar(id: number) {
    const response = await fetch(`${BASE_URL}/garage/${id}`)
    if (response.status === 404) throw new Error("Car not found")
    return response.json()
  }

  public async createCar(car: number) {
    const response = await fetch(`${BASE_URL}/garage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
    return response.json()
  }

  public async deleteCar(id: number) {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: "DELETE",
    })
    if (response.status === 404) throw new Error("Car not found")
    return response.json()
  }

  public async updateCar(id: number, car: number) {
    const response = await fetch(`${BASE_URL}/garage/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    })
    if (response.status === 404) throw new Error("Car not found")
    return response.json()
  }

  public async setCarEngineStatus(id: number, status: number) {
    const response = await fetch(
      `${BASE_URL}/engine?id=${id}&status=${status}`,
      {
        method: "PATCH",
      }
    )
    return response.json()
  }

  public async getWinners(
    page: number,
    limit: number,
    sort: number,
    order: number
  ) {
    const response = await fetch(
      `${BASE_URL}/winners?_page=${page || ""}&_limit=${limit || ""}&_sort=${
        sort || ""
      }&_order=${order || ""}`
    )
    const data = await response.json()
    const totalCount = response.headers.get("X-Total-Count")
    return { data, totalCount }
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
