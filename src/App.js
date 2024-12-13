import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    cartTotal: 0,
    cartCount: 0,
  }

  removeAllCartItems = () => {
    this.setState({cartList: [], cartTotal: 0, cartCount: 0})
  }

  incrementCartItemQuantity = (id, price) => {
    console.log(id)
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity + 1}
        }
        return eachItem
      }),
      cartTotal: prevState.cartTotal + price,
    }))
  }

  decrementCartItemQuantity = (id, price, quantity) => {
    console.log(id)
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return eachItem
      }),
      cartTotal: prevState.cartTotal - price,
    }))
    if (quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(eachItem => eachItem.quantity > 0),
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.filter(eachItem => eachItem.quantity > 0),
        cartCount: prevState.cartCount - 1,
      }))
    }
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const cartItemsIds = cartList.map(eachItem => eachItem.id)

    if (cartItemsIds.includes(product.id)) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (eachItem.id === product.id) {
            return {...eachItem, quantity: eachItem.quantity + 1}
          }
          return eachItem
        }),
        cartTotal: prevState.cartTotal + product.price,
      }))
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
        cartTotal: prevState.cartTotal + product.price,
        cartCount: prevState.cartCount + 1,
      }))
    }
  }

  removeCartItem = (id, price, quantity) => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.id !== id),
      cartCount: prevState.cartCount - 1,
      cartTotal: prevState.cartTotal - quantity * price,
    }))
  }

  render() {
    const {cartList, cartTotal, cartCount} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeAllCartItems: this.removeAllCartItems,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          cartTotal,
          cartCount,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
