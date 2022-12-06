import { Action } from '@ngrx/store';
import { ICoffee } from '../models/coffee.model';


export enum ActionTypes {
  Add = '[Coffee] Add to cart',
  Remove = '[Coffee] Remove from cart',
  Update = '[Coffee] Update items in cart',
  LoadItems = '[Coffee] Load items from server',
  LoadSuccess = '[Coffee] Load success',
  SetCustomer = '[Customer] is set',
  Clear = 'Empty the [Cart]'
}
export class AddToCart implements Action {
  readonly type = ActionTypes.Add;
  constructor(public payload: ICoffee) {
  }
}
export class UpdateCart implements Action {
  readonly type = ActionTypes.Update;
  constructor(public payload: ICoffee) {   
  }
}
export class ClearCart implements Action {
  readonly type = ActionTypes.Clear;
  constructor() {   
  }
}

export class RemoveFromCart implements Action {
  readonly type = ActionTypes.Remove;
  constructor(public payload: ICoffee) {  
  }
}
export class SetCustomer implements Action {
  readonly type = ActionTypes.SetCustomer;

  constructor(public payload: any) {  
   
  }
}

export type Actions = AddToCart | RemoveFromCart |UpdateCart|SetCustomer|ClearCart;
// | GetItems | LoadItems;
