import { ConditionalExpr } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-customer-search',
  templateUrl: './customer-search.component.html',
  styleUrls: ['./customer-search.component.scss']
})
export class CustomerSearchComponent implements OnInit {
  constructor( private router: Router, private formBuilder: FormBuilder, private productService: ProductService) {
  }
  
  customerList: any;
  @Output() customerSearch = new EventEmitter();
  @Input() showClearSearch:any;

  continueSubmit() {    
    this.router.navigate(['payment']);
  }

  onSubmit(option) {   
    this.customerSearch.emit(option);
    
  }
  clearSearch(){
    this.searchCustControl.reset();
    this.customerSearch.emit(null);    
  }
  
  searchCustControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.productService.getCustomers(true).subscribe((res: any) => {
      this.customerList = res;         
      this.filteredOptions = this.searchCustControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '')),
      );
    });
  }
  private _filter(value: string): string[] {
    const filterValue = value.toString().toLowerCase();
    return this.customerList.filter(option => option.toString().toLowerCase().includes(filterValue));
  }
}