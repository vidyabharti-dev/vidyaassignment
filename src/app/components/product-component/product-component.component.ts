import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICoffee } from 'src/app/models/coffee.model';
import { CoffeeCart } from 'src/app/models/coffeeCart.model';
import { AddToCart } from 'src/app/store/action';

class selectedProduct implements ICoffee {
  amount: number;
  drink: string;
  size: string;
  price: number;
  num: number;
};

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss']
})
export class ProductComponentComponent implements OnInit {

  constructor(private store: Store<CoffeeCart>) {
  }
  ngOnInit() {
  }
  @Input() product: any;


  addProductToCart(product, option) {
    let coffee = new selectedProduct();
    coffee.drink = product.drink_name;
    coffee.price = option.price;
    coffee.size = option.variant;
    this.store.dispatch(new AddToCart(coffee));
  }
}
