import BaseComponent from "../../../../utils/baseComponent";
import CarComponent from "./car/car-component";
import garageEventEmmiter from "../../../../services/garage-eventEmmiter";
import { Car } from "../../../../interfaces/car.interface";

export default class RaceComponent extends BaseComponent {

    private carsNumber: number | null

    private carsArr: CarComponent[] = []


    constructor(params: {parent: HTMLElement}){
        super({parent: params.parent})
        this.initListeners()
    }

    private initListeners = () => {
        garageEventEmmiter.on(garageEventEmmiter.events.DRAW_CARS, this.drawCars)

    }

    private drawCars = (cars: Car[]) => {
        if (cars.length === this.carsNumber) {
            this.carsArr.forEach((car, index) => { car.updateCar(cars[index])})
            return
        }
        this.carsArr = cars.map(car => {
            const carComp = new CarComponent({parent: this.node})
            carComp.updateCar(car)
            return carComp
        })
    }
}