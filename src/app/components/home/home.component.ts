import { Component, enableProdMode, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {   MatDialog, MatDialogConfig } from '@angular/material';
import {  MatAccordion  } from'@angular/material/expansion'
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ReplaySubject } from 'rxjs';
import { CoffeeCart } from 'src/app/models/coffeeCart.model';
import { ProductService } from 'src/app/service/product.service';
import { ClearCart } from 'src/app/store/action';
import { LoginComponent } from '../login/login.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  responsiveOptions;
  loader = false;

  productList: any = [];
  cart: CoffeeCart;
  isMobile;
  public innerWidth: any;

  constructor(
    private productService: ProductService, public matDialog: MatDialog, private store: Store<any>, private router: Router) {

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 10);
  }
  ngOnInit() {
    this.checkIsMobile(); 
    this.productService.getMenu(false).subscribe((res: any) => {
    this.productList = res
    localStorage.setItem("menuList", JSON.stringify(this.productList));
    },
    );
    this.getFromStore();
  }

  getFromStore() {
    this.store.pipe(select('shop')).subscribe((state) => (this.cart = state));
  }
  newOrder() {
    this.store.dispatch(new ClearCart()); // NGRX
  }
  continuePayment() {
    this.router.navigate(['payment'],{skipLocationChange: true});
  }
  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    const modalDialog = this.matDialog.open(LoginComponent, dialogConfig);
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

