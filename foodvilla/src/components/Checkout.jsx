import React, { useContext, useActionState } from 'react'
import CartContext from '../store/CartContext'
import Modal from './UI/Modal';
import { currencyFormatter } from '../utils/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

const Checkout = () => {

    const cartCntx = useContext(CartContext);
    const userProgressCntx = useContext(UserProgressContext);
    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:8000/orders', requestConfig);

    const cartTotal = cartCntx.items.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

    function handleClose() {
        userProgressCntx.hideCheckout()
    }

    function handleFinish() {
        userProgressCntx.hideCheckout()
        cartCntx.clearCart();
        clearData()
    }

    // function handleSubmit(event) {
    //   event.preventDefault();
    //   const fd = new FormData(event.target);
    //   const customerData = Object.fromEntries(fd.entries()); 
    //    sendRequest(JSON.stringify({
    //         order: {
    //             items: cartCntx.items,
    //             customer: customerData
    //         }   
    //     }));
    // }
    async function checkoutAction(prevState, fd) {

        const customerData = Object.fromEntries(fd.entries());
        await sendRequest(JSON.stringify({
            order: {
                items: cartCntx.items,
                customer: customerData
            }
        }));
    }


    const [formState, formAction, pending] = useActionState(checkoutAction, null)

    let actions = (
        <>
            <Button type='button' onClick={handleClose}>Close</Button>
            <Button >Submit Order</Button>
        </>
    );

    // if (isSending) {
    //     actions = <span>Sending order data...</span>
    // }

    if (pending) {
        actions = <span>Sending order data...</span>
    }

    if (data && !error) {
        return <Modal open={userProgressCntx.progress === 'checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order is submitted successfully</p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return (
        <Modal open={userProgressCntx.progress === 'checkout'} onClose={handleClose}>
            {/* <form onSubmit={handleSubmit}> */}
            <form action={formAction}>
                <h2>Checkout</h2>
                <h2>Total Amount: { }</h2>
                <Input label="Full Name" type="text" id="name" />
                <Input label="E-mail" type="email" id="email" />
                <Input label="Street" type="text" id="street" />
                <div className='control-row'>
                    <Input label="Postal Code" type="text" id="postal-code" />
                    <Input label="City" type="text" id="city" />
                </div>
                {error && <Error title="Failed to submit order" message={error} />}
                <p className='modal-actions'>{actions}</p>

            </form>
        </Modal>
    )
}

export default Checkout