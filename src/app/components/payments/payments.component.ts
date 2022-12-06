import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CoffeeCart } from 'src/app/models/coffeeCart.model';
import { ProductService } from 'src/app/service/product.service';
import { ClearCart } from 'src/app/store/action';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  currentPayment: any = 0;

  customer: any;
  walletAmount: any
  customerOrderTotal: any;
  customerPayments: any;
  cart: CoffeeCart;
  isMobile;
  public innerWidth: any;

  constructor(
    private productService: ProductService, private store: Store<any>, private router: Router) {
  }

  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkIsMobile(); 
  }

checkIsMobile(){
  this.innerWidth = window.innerWidth;
  if (this.innerWidth >= 700) {
    this.isMobile = "false"
  }
  else this.isMobile = "true";
 
}

  ngOnInit() {
    this.checkIsMobile();
    this.store.pipe(select('shop')).subscribe((state) => (this.cart = state));
    this.customer = this.cart.customerName;
  }
  ngOnChanges() {
    this.ngOnInit();
  }
  placeOrder(payment) {
    alert("Hurray! order placed.");

    this.store.dispatch(new ClearCart()); // NGRX
    this.store.pipe(select('shop')).subscribe((state) => (this.cart = state));
    this.router.navigate(['home']);
  }
  setCustomerOrderTotal(amount) {
    this.customerOrderTotal = amount;
    this.calculateWalletBalance();
  }
  setCustomerPayments(amount) {
    this.customerPayments = amount;
    this.calculateWalletBalance();
  }
  calculateWalletBalance() {
    this.walletAmount = this.customerPayments - this.customerOrderTotal;
  }
}

