import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnChanges {

 

  filteredOrderResult: any;
  productList: any;
  showCustomer: any;

  @Input() customer: any;
  @Output() customerOrderTotal = new EventEmitter();

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getAllOrders(true).subscribe((res: any) => {
      this.filteredOrderResult = res;
      this.addCosttoOrders(this.filteredOrderResult);
      if (this.customer != null) {
        this.filteredOrderResult = this.filteredOrderResult.filter(order => order.user === this.customer);
        this.showCustomer = false;
        this.customerOrderTotal.emit(this.calcOrderTotal());
      }

    })
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  calcOrderTotal() {
      return this.filteredOrderResult.reduce((acc, prod) => acc += prod.price, 0)
  }

  addCosttoOrders(orderList: any) {
    this.productList = localStorage.getItem("menuList");
    this.productList = JSON.parse(this.productList);
    let result;
    for (result of orderList) {
      let prod = this.productList.find(item => item.drink_name == result.drink);
      result["price"] = prod.prices[result.size];
    }
  }

  columns = [
    {
      title: "Customer",
      data: "user",

    },
    {
      title: "",
      data: "image",

    },
    {
      title: "Product",
      data: "drink",

    },
    {
      title: "Size",
      data: "size"

    },
    {
      title: "Amount(€)",
      data: "price"
    }
  ];
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
















