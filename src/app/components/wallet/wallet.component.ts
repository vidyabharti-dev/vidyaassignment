import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  constructor() { }

  customer: any;
  walletAmount: any
  customerOrderTotal: any;
  customerPayments: any;

  isMobile;
  public innerWidth: any;


  ngOnInit() {
    this.checkIsMobile(); 
  }
  searchCustomer(customerName) {
    this.customer = customerName;
  }
  clearSearch() {
    this.customer = "";
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

}
