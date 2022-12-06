import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { LoginComponent } from '../login/login.component';
import { ICoffee } from 'src/app/models/coffee.model';
import { CoffeeCart } from 'src/app/models/coffeeCart.model';
import { AddToCart, RemoveFromCart, UpdateCart } from 'src/app/store/action';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  products: any[];
  constructor(public matDialog: MatDialog,private store: Store<any>) { }
  cart:CoffeeCart;
  ngOnInit() {
    this.store.pipe(select('shop')).subscribe((state) => (this.cart = state));
    this.products = this.cart.products

  }  

  modelChanged(qty, product) {   
    if (qty < 1) {
      this.store.dispatch(new RemoveFromCart(product)); // NGRX
    }   
    else{
    this.store.dispatch(new UpdateCart(product)); // NGRX
  }
  }

  onPreSpinner(qty, product) {
    product.num--;    
    if (product.num > 0){
      this.store.dispatch(new UpdateCart(product)); // NGRX     
    } 
    else{
      this.store.dispatch(new RemoveFromCart(product)); // NGRX
    }  
  }
  onNextSpinner(qty, product) {
    product.num++;
    this.store.dispatch(new UpdateCart(product)); // NGRX
   }

}


