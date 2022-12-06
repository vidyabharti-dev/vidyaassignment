// import { ShopItem } from '../class/ShopItem';

import { ICoffee } from "./coffee.model";

export class CoffeeCart {
    products: ICoffee[];
    totalItems: number; //Counter
    totalAmount: number; //Cash summary
    customerName: string;

    constructor() {
        this.products = [];
        this.totalItems = 0;
        this.totalAmount = 0;
    }
}
