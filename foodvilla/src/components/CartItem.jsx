import React from 'react'
import { currencyFormatter } from '../utils/formatting'

const CartItem = ({ name, quantity, price, onIncrease, onDecrease}) => {
    return (
        <li className="cart-item">
            <p>{name} - {quantity}  X {currencyFormatter.format(price)}</p>
            <p className='cart-item-actions'>
            <button onClick={onDecrease} className='qnty-btn'>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease} className='qnty-btn'>+</button>
            </p>
        </li>
    )
}

export default CartItem