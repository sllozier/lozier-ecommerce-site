import React from 'react'
import { useSelector } from 'react-redux'

function Cart() {
    const state = useSelector(state => state)
    console.log(state.guestCart)
    return (
        <div>
            {state.guestCart.map((element) =>
                <p>{element.title}</p>
            )}
        </div>
    )
}

export default Cart