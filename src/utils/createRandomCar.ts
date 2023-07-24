import { Car } from "../interfaces/car.interface"

const brands = [
  "Tesla",
  "Ford",
  "Chevrolet",
  "Toyota",
  "BMW",
  "Audi",
  "Honda",
  "Mercedes-Benz",
  "Nissan",
  "Hyundai",
]

const models = [
  "Model S",
  "Mustang",
  "Cruze",
  "Camry",
  "X5",
  "Q5",
  "Civic",
  "C-Class",
  "Altima",
  "Elantra",
]

const getRandomColor = () => {
  const red = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")
  const green = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")
  const blue = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, "0")
  return `#${red}${green}${blue}`
}

const getRandomCarName = () => {
  const brand = brands[Math.floor(Math.random() * brands.length)]
  const model = models[Math.floor(Math.random() * models.length)]

  return `${brand} ${model}`
}

const createRandomCar = () => {
  return {
    name: getRandomCarName(),
    color: getRandomColor(),
  }
}

const generateCars = (length: number): Omit<Car, "id">[] => {
  const cars: Omit<Car, "id">[] = []
  for (let i = 0; i < length; i += 1) {
    cars.push(createRandomCar())
  }
  return cars
}

export default generateCars
