import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/user.context.jsx'
import { UserProvider } from '../../contexts/user.provider.jsx';

import { signUserOut } from '../../utils/firebase/firebase.utils'
//import { ReactComponent as Logo } from '../../assets/crown.svg'
import '../navigation/navigation.styles.scss'
import logo from '../../assets/crown.svg'

function Navigation() {
    // We imported the value of the currentUser from the User Context file
    const { currentUser } = useContext(UserContext);
    
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
                            <Link className='nav-link' to='/authentication'>
                                SIGN IN
                            </Link>
                        )
                    }
                    
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;