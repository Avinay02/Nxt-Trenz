import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  cartTotal: 0,
  cartCount: 0,
})

export default CartContext
