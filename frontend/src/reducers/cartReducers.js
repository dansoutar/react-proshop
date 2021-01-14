import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants.js';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // check if the item is already in the cart
      const itemExists = state.cartItems.find((cartItem) => {
        return cartItem.product === item.product;
      });

      // if item is already in the cart, return the state as it is
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((cartItem) => {
            return cartItem.product === itemExists.product ? item : cartItem;
          }),
        };
      }
      // if item is new, return the state with the new item added
      else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case CART_REMOVE_ITEM:
      console.log(action.payload);

      return {
        ...state,
        cartItems: state.cartItems.filter((cartItem) => {
          return cartItem.product !== action.payload;
        }),
      };
    default:
      return state;
  }
};
