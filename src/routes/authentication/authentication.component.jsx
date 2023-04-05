import { useEffect } from 'react'
import { getRedirectResult } from "firebase/auth"
import { 
    auth,
    signInWithGooglePopup,
    createUserDocumentFromAuth,
    signInWithGoogleRedirect
} from '../../utils/firebase/firebase.utils'



function authentication() {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup(); //deconstructed user from the object usually returned when the method is called
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    
    // This runs when the app mounts for signing in with redirect
    useEffect( () => {
        //Created an async function to get the auth result, then userDocRef calls 
        //for user to be created from the user object in the response
        const logGoogleUserWithRedirect = async () => {
                const response = await getRedirectResult(auth); //
                
                if (response) {
                    const userDocRef = await createUserDocumentFromAuth(response.user)
                }
            }
        //call the function (itself) above. This calls on initial mount and on reload
        logGoogleUserWithRedirect()
    }, [])
    

    
    return (
        <div>
            <p>Sign In Page</p>
            <button onClick={logGoogleUser}>
                Sign in with Google Popups
            </button>
            
            {<br />}
            {<br />}
            Optional sign-in method
            <div>
                <button onClick={signInWithGoogleRedirect}>
                    Sign in with Google Redirect
                </button>
            </div>
        </div>
    )
}

export default authentication