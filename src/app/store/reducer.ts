import { ICoffee } from "../models/coffee.model";
import { CoffeeCart } from "../models/coffeeCart.model";
import { Actions, ActionTypes, AddToCart } from "./action";

export function ShopReducer(state: CoffeeCart = new CoffeeCart(), action: Actions) {
 
  switch (action.type) {
    case ActionTypes.Add:
      return AddProduct(state, action.payload);
    case ActionTypes.Update:
      return UpdateProduct(state, action.payload);
    case ActionTypes.Remove:
      return RemoveProduct(state, action.payload);
    case ActionTypes.Clear:
        return ClearCart(state);
      case ActionTypes.SetCustomer:
      return SetCustomer(state, action.payload)
    default:
      return state;
  }


  function ClearCart(coffeeCart: CoffeeCart){
    return coffeeCart = new CoffeeCart();
  }
  function SetCustomer(coffeeCart: CoffeeCart, name: any)
  {
    coffeeCart.customerName=name;
    return coffeeCart;
  }
  function AddProduct(coffeeCart: CoffeeCart, coffee: ICoffee) {
    const productExistInCart = coffeeCart.products.find(item => item.drink === coffee.drink && (item.size === coffee.size)); // find product by name
    if (!productExistInCart) {
      coffeeCart.products.push({ ...coffee, num: 1, amount: coffee.price }); // enhance "porduct" opject with "num" property
    }
    else{
      productExistInCart.num += 1;
    }
     return recalculateCartSummary(coffeeCart);
  }

  function UpdateProduct(coffeeCart: CoffeeCart, coffee: ICoffee) {
    const productExistInCart = coffeeCart.products.find(item => item.drink === coffee.drink && (item.size === coffee.size));
    if (productExistInCart) {
      productExistInCart.num = coffee.num;
    }    
    return recalculateCartSummary(coffeeCart);
  }
  function RemoveProduct(coffeeCart: CoffeeCart, coffee: ICoffee) {
    coffeeCart.products = coffeeCart.products.filter(item => item.drink !== coffee.drink || (item.size !== coffee.size));   
    if(coffeeCart.products.length<1) {return ClearCart(coffeeCart);}
    return recalculateCartSummary(coffeeCart);
  }

  function recalculateCartSummary(coffeeCart: CoffeeCart){
  coffeeCart.products.forEach(product=>{product.amount = product.num*product.price});
  coffeeCart.totalItems=coffeeCart.products.reduce((acc, product) => acc += product.num, 0);
  coffeeCart.totalAmount=coffeeCart.products.reduce((acc, product) => acc += product.amount, 0);
  return coffeeCart;
  }
  

}
