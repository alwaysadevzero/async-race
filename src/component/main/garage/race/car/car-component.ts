import BaseComponent from "../../../../../utils/baseComponent";
import { Car } from "../../../../../interfaces/car.interface";

export default class CarComponent extends BaseComponent {
    private id: number | null

    constructor(params: {parent: HTMLElement},) {
        super({ parent: params.parent });
    }

    public updateCar = (car: Car) => {
        this.id = car.id
        console.log(car)
    }
}