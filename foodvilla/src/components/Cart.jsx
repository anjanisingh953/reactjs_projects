import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../utils/formatting';
import UserProgressContext from '../store/UserProgressContext';
import Button from './UI/Button';
import CartItem from './CartItem';

const Cart = () => {
    const cartCntx = useContext(CartContext);
    const userProgressCntx = useContext(UserProgressContext);

    function handleCloseCart() {
        userProgressCntx.hideCart()
    }
 function handleGoToCheckout() {
        userProgressCntx.showCheckout()
    }

    const cartTotal = cartCntx.items.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

    return (
        <Modal className="cart" open={userProgressCntx.progress === 'cart'}
         onClose={userProgressCntx.progress === 'cart' ? handleCloseCart : null} >
            <h2>Your cart</h2>
            <ul>
                {
                    cartCntx.items.map((item) => (
                        <CartItem key={item.id}
                          name={item.name}
                          quantity={item.quantity}
                          price={item.price}
                          onIncrease={()=>cartCntx.addItem(item)}
                          onDecrease={()=>cartCntx.removeItem(item.id)}
                        />
                    ))
                }
            </ul>
            <p className="car-total">{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button onClick={handleCloseCart}>close</Button>
                {cartCntx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to checkout</Button>  }

            </p>
        </Modal>
    )
}

export default Cart