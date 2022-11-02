import React from 'react';
import { Link } from 'react-router-dom';

//PAYMENT RECIEVE? DISPATCHING PROCESS ORDER FROM REDUCER + SENDING IT THROUGH CHECKOUT API?//

const PaymentConfirmation = () => {
    const max = 100000000000;
    const min = 100000;

    let orderNumber = Math.floor(Math.random() * (max - min + 1) + min);

    return (
        <div className='confirmation-page-container'>
            <h1>Thank you for your order!</h1>
            <h1>We hope you enjoy listening!</h1>
            <h3>{`Order Number: #${orderNumber}`}</h3>
            <Link to='/products'>
                <button>Back to Homepage</button>
            </Link>
        </div>
    )
};

export default PaymentConfirmation;