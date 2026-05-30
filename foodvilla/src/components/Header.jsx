import React, {  useContext } from 'react'
import Button from './UI/Button'
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

const Header = () => {
const cartCntx = useContext(CartContext);
const userProgressCntx = useContext(UserProgressContext);

function handleShowCart(){
    userProgressCntx.showCart()
}

const totalCartItem = cartCntx?.items?.reduce((acc,curr)=>{
   return acc+curr.quantity
},0)

    return (
        <>
            <section className='heading'>
                <div>This is Header</div>
                <nav>
                    <Button textonly={"true"} onClick={handleShowCart}>Cart ({totalCartItem})</Button>
                </nav>
            </section>
        </>
    )
}

export default Header