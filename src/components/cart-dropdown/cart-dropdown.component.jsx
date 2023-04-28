import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate()

    // Function that utilizes the navigate above which we use in the onclick for the checkout button
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {(cartItems.length < 1)
                    ? <span className='empty-message'>Your cart is empty</span>
                    : (cartItems.map(item => 
                        <CartItem 
                            key={item.id}
                            cartItem={item} 
                        /> 
                    ))
                }
            </div>
            <Button 
                buttonType=''
                onClick={goToCheckoutHandler}
            >GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;