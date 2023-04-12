import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss'
import ShoppingIcon from '../../assets/shopping-bag.svg'

function CartIcon() {

    // imports the current values from Cart Context
    const { isCartOpen, setIsCartOpen } = useContext(CartContext)

    // Function to switch the value of isCartOpen to true or false, when clicked
    function toggleIsCartOpen() {
        setIsCartOpen(!isCartOpen)
    }

    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <img src={ShoppingIcon} className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon;