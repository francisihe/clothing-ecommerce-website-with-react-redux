import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'


function authentication() {
    
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup(); //deconstructed user from the object usually returned when the method is called
        const userDocRef = await createUserDocumentFromAuth(user)
    }

    return (
        <div>
            <p>Sign In Page</p>
            <button onClick={logGoogleUser}>
                Sign in with Google Popups
            </button>
        </div>
    )
}

export default authentication