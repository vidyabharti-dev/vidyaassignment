import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit, OnChanges {

  @Input() customer: any;
  @Output() customerPayments = new EventEmitter();

  filteredPayments: any;
  totalPayments: number;

  columns = [
    {
      title: "Customer",
      data: "user",
    },
    {
      title: "Amount(€)",
      data: "amount",
    },
  ];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getAllPayments(true).subscribe((res: any) => {
      this.filteredPayments = res;
      if (this.customer != null) {
        this.filteredPayments = this.filteredPayments.filter(payment => payment.user === this.customer);
        this.customerPayments.emit(this.calcTotalPayments());
      }
    })
  }
  ngOnChanges() {
   this.ngOnInit();
  }
  calcTotalPayments() {
    return this.filteredPayments.reduce((acc, prod) => acc += prod.amount, 0)
  }
 
  getData(data, label) {
    //console.log(data,label);
    if (!data[label]) {
      for (var x in data) {
        if (typeof data[x] === 'object') {
          return this.getData(data[x], label)
        }
      }
    }
    return data[label];
  }
}



































