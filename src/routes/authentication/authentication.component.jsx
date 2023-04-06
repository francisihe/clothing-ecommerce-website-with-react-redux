// import { useEffect } from 'react'
// import { getRedirectResult } from "firebase/auth"

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form-component';
import '../authentication/authentication.styles.scss'

function authentication() {
    
    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />  
        </div>
    );
};

export default authentication;

//Moved the sign in with google popup into the sign up form component