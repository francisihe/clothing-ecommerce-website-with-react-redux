import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
// import { UserContext } from '../../contexts/user.context.jsx'
import { CartContext } from '../../contexts/cart.context.jsx';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector.js'

import { signUserOut } from '../../utils/firebase/firebase.utils'
import '../navigation/navigation.styles.scss'
import logo from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component.jsx';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component.jsx';

function Navigation() {
    // // We imported the value of the currentUser from the User Context file
    // const { currentUser } = useContext(UserContext);
    // The above code was removed cause we no longer make use of UserContext but Redux
    // useSelector enables us interact with data from the Redux store
    const currentUser = useSelector(selectCurrentUser)
    const { isCartOpen } = useContext(CartContext); // import value of isCartOpen to conditionally render the Cart dropdown component
    
    // --this function was removed since we no longer need to use the setCurrentUser within as we now utilize onAuthCHangeListener
    // --so the sign out button will instead directly call signUserOut to sign out.
    
    //Function to handle signing out
    // const signOutHandler = async () => {
    //     await signUserOut();
    //     setCurrentUser(null);
    // }

    return(
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <img className='logo' src={logo} alt='clothing-website-logo'/>
                </Link>
            
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>

                    {/* Basically, if we have a current user, gotten from UserContext, display sign out, else display sign in */}
                    
                    { currentUser 
                        ? (<span className='nav-link' onClick={signUserOut}> SIGN OUT </span>)
                        : (
                            <Link className='nav-link' to='/auth'>
                                SIGN IN
                            </Link>
                        )
                    }

                    <CartIcon />
                    
                </div>
                
                { isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;