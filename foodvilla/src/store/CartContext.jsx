import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { }
});

//The task of reducer function is to returns the updated state
//action params tells the reducer function, how to update the state
//It is convention that action should be object type, usually action has type property

function cartReducer(state, action) {
    if (action.type == 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const updatedItems = [...state.items];


        if (existingCartItemIndex > -1) {
            const existngItem = state.items[existingCartItemIndex];
            const updatedItem = {
                ...existngItem,
                quantity: existngItem.quantity + 1
            }
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems.push({ ...action.item, quantity: 1 })
        }

        return { ...state, items: updatedItems }
    }
    if (action.type == 'REMOVE_ITEM') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);

        const existingCartItem = state.items[existingCartItemIndex];
        const updatedItems = [...state.items];
        if (existingCartItem.quantity === 1) {
            updatedItems.splice(existingCartItemIndex, 1)
        } else {
            const updatedItem = { ...existingCartItem,
                 quantity: existingCartItem.quantity-1 }
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItems }
    }

    //unchanged state
    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });



    function addItem(item) {
        dispatchCartAction({  item: item, type: 'ADD_ITEM' })
    }

    function removeItem(id) {
        dispatchCartAction({  id, type: 'REMOVE_ITEM' })
    }

    const cartCntx = {
        items: cart.items,
        addItem,
        removeItem
    }
console.log('cartCntx>>>',cartCntx)
    return (<CartContext.Provider value={cartCntx}>{children}</CartContext.Provider>)
}

export default CartContext;