import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {

  }
  public getAllOrders(latest: boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };


    if (latest) {
      httpOptions.headers = httpOptions.headers.set('x-refresh', 'true');
    }
    return this.http.get(`/orders`, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        }))
  }

  public getCustomers(latest: boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };


    if (latest) {
      httpOptions.headers = httpOptions.headers.set('x-refresh', 'true');
    }
    return this.http.get(`/customers`, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        }))

  }

  public getAllProducts(latest: boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };


    if (latest) {
      httpOptions.headers = httpOptions.headers.set('x-refresh', 'true');
    }
    return this.http.get(`/prices`, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        }))

  }

  public getMenu(latest: boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };

    if (latest) {
      httpOptions.headers = httpOptions.headers.set('x-refresh', 'true');
    }
    return this.http.get(`/menu`, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        }))

  }

  public getAllPayments(latest: boolean): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders(),
    };


    if (latest) {
      httpOptions.headers = httpOptions.headers.set('x-refresh', 'true');
    }
    return this.http.get(`/payments`, httpOptions)
      .pipe(
        catchError((err) => {
          return throwError(err);
        }))

  }
}
