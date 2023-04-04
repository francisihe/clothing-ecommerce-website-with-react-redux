import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom'

//import { ReactComponent as Logo } from '../../assets/crown.svg'
import '../navigation/navigation.styles.scss'
import logo from '../../assets/crown.svg'

function Navigation() {
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

                    <Link className='nav-link' to='/authentication'>
                        SIGN IN
                    </Link>
                </div>
            </div>
            <Outlet />
        </Fragment>
    );
};

export default Navigation;