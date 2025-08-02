import { findSum } from "./util";

export const addToCart = item => {
    let cart = localStorage.getItem('cart')
    if (cart) {
        cart = JSON.parse(cart);
        let existing = cart.filter(cart => cart.item === item.item);
        if (existing.length > 0) {//Already present in the cart
            existing[0].quantity += item.quantity
        } else {
            cart = [...cart, item]
        }
    } else {
        cart = [item];
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const getCart = () => {
    let cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : []
}

export const getCartCount = () => findSum(getCart(), 'quantity')

export const changeCartQuantity = (index, quantity) => {
    let cart = getCart()
    cart[index].quantity = quantity
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const removeCartItem = (index) => {
    let cart = getCart()
    cart.splice(index, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
}

export const clearCart = () => {
    localStorage.removeItem('cart')
}