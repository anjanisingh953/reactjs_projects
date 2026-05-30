import React, { useContext } from 'react'
import { currencyFormatter } from '../utils/formatting.js'
import Button from './UI/Button.jsx'
import CartContext from '../store/CartContext.jsx'
const Mealtem = ({meal}) => {
const cartCntx = useContext(CartContext)
    function handleAddMealToCart(){
        // console.log('mel',meal)
        cartCntx.addItem(meal)
    }

    return (
    <>
    <li className='meal-item'>
        <article>
            <img src={`http://localhost:8000/${meal.image}`} width={'100%'} height={170} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className='meal-item-price'>{currencyFormatter.format(meal.price)}</p>
                <p className='meal-item-description'>{meal.description}</p>
            </div>
            <p className='meal-item-actions'>
                <button onClick={handleAddMealToCart}>Add to Cart</button>
                {/* <Button onClick={handleAddMealToCart}>Add to Cart</Button> */}
            </p>
        </article>
    </li>
    </>
  )
}

export default Mealtem