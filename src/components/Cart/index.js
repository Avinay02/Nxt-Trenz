import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, cartCount, cartTotal, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const onClickRemove = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  data-testid="remove"
                  className="remove-all-button"
                  type="button"
                  onClick={onClickRemove}
                >
                  Remove All
                </button>
                <CartListView />
                <div className="cart-total-contianer">
                  <h1 className="total-price-para">Order Total:</h1>
                  <h1>Rs {cartTotal}/-</h1>
                  <p className="items-count-para">{cartCount} Items in cart</p>
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                </div>
                {/* TODO: Add your code for Cart Summary here */}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
