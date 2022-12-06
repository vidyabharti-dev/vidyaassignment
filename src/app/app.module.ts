import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'primeng/carousel';
import { SidebarModule } from 'primeng/sidebar';
import { HeaderComponent } from './components/includes/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/includes/footer/footer.component';
import { PipeModule } from './pipe/pipe.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule, MatDialogModule, MatLabel, MatPaginatorModule } from '@angular/material';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './material-module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponentComponent } from './components/product-component/product-component.component';
import { CacheResolverService } from './service/cache-resolver.service';
import { CacheInterceptor } from './service/cache.interceptor';
import { PaymentsComponent } from './components/payments/payments.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { CustomerSearchComponent } from './components/customer-search/customer-search.component';
import { ShopReducer } from './store/reducer';
import { EffectsModule } from '@ngrx/effects';
import { ShopEffects } from './store/effect';
import { StoreModule } from '@ngrx/store';
import { AccordionModule, InplaceModule } from 'primeng';
import { OrdersComponent } from './components/order/orders.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    ShoppingCartComponent, 
    ProductListComponent, ProductComponentComponent, PaymentsComponent, WalletComponent, PaymentHistoryComponent,
     CustomerSearchComponent,OrdersComponent
     
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    PipeModule,
    CarouselModule,
    SidebarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialModule,
    FormsModule,
    StoreModule.forRoot({ shop: ShopReducer }),
    EffectsModule.forRoot([ShopEffects]),
  ],
  providers: [
  CacheResolverService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: CacheInterceptor,
    multi: true
  }],

  bootstrap: [AppComponent],
  entryComponents: [LoginComponent]
})
export class AppModule { }
