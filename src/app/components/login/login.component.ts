import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CoffeeCart } from 'src/app/models/coffeeCart.model';
import { ProductService } from 'src/app/service/product.service';
import { SetCustomer } from 'src/app/store/action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<LoginComponent>, private router: Router, private formBuilder: FormBuilder, private productService: ProductService,
  private store: Store<any>) {
  }

  cart:CoffeeCart;


  continueSubmit() {
    this.dialogRef.close();
    this.router.navigate(['payment'] ,{skipLocationChange: true});
  }
  closeModal() {
    this.store.dispatch(new SetCustomer(null));
    this.dialogRef.close();
  }
  onSubmit(option) {
    this.store.dispatch(new SetCustomer(option));
    this.store.pipe(select('shop')).subscribe((state) => (this.cart = state));
  }
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;
  ngOnInit() {

    
  }
 
}