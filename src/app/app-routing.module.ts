import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/order/orders.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { CustomerSearchComponent } from './components/customer-search/customer-search.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'payment',
    component: PaymentsComponent,
  },
  {
    path: 'wallet',
    component: WalletComponent,
  },
  
  
  {
    path: '**',
    redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
