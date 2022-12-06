import { mergeMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { ProductService } from '../service/product.service';
import {  ActionTypes } from './action';
import { Actions,  createEffect, ofType } from '@ngrx/effects';


@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadCoffees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.LoadItems),
      mergeMap(() =>
        this.productService.getAllProducts(false).pipe(
          map((coffee) => ({
            type: ActionTypes.LoadSuccess,
            payload: coffee,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}

