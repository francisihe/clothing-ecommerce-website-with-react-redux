import { useState, useContext } from 'react'
//import { createNewUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { getRedirectResult  } from 'firebase/auth'
import { 
    signUserInWithEmailAndPassword,
    signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-in-form.styles.scss'
import '../button/button.styles.scss'

// -- removed as we now utilize onAuthChangeListener from firebase in user context file
// import { UserContext } from '../../contexts/user.context';


/* 
ATTENTION AND NOTE TO SELF:

Change the error messages logged in the catch method from line 56 downwards.
You do not want bad actors having easy access by letting them know if an email account
already exists or not, and therefore you simply want to show "email or password mismatch" or 
"invalid credentials" when either the user does not exist or the password is incorrect.

*/

const defaultFormFields = {
    email: '',
    password: '',
}


function SignInForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    // Here we pass in the currentUser and setCurrentUser in the UserContext we imported which holds the values
    // We then deconstruct it to setCurrentUser. So that when the handleSumbit function in the form runs, and the user is created
    // The setCurrentUser(user) function within handleSubmit runs, and the user is passed here.
    // Thereby also passing it to the UserContext file which holds the data to be available everywhere else.
        // -- removed since we no longer use this but the onAuthChangeListener
    // const { setCurrentUser } = useContext(UserContext);
    
    //Function to handle changes in the form input
    function handleChange(event) {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    //Function that handles signing in with Google Popup
    const signInGoogleUser = async () => {
        await signInWithGooglePopup();
        // setCurrentUser(user); --removed and instead now uses onAuthChangeListener
    }
        

    //Function to reset form fields to default empty object after submission
    function clearForm() {
        setFormFields(defaultFormFields)
    }


    //Function to handle submission of values of form to database to authenticate sign in
    async function handleSubmit(event) {
        event.preventDefault();
       
       try {
            // added the user object while trying the user context usage
            const {user} = await signUserInWithEmailAndPassword(email, password);
            //setCurrentUser(user); //This passes the user object to the UserContext --removed and instead now uses onAuthChangeListener
            clearForm();

       } catch(error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('User with this email aready exists')
            } else if (error.code == 'auth/user-not-found') {
                alert('User does not exist. Please sign up and try again')
            } else if (error.code == 'auth/wrong-password') {
                alert('Your password is incorrect, try again')
            } else {
                console.log('User sign in failed. Contact support', error);
            }
       }
    }

    /*
    Alternatively, we could have used a switch, case, break style within the catch above

    ```
        catch(error) {
            switch (error.code) {
                case 'auth/email-already-in-use':
                    alert('User with this email aready exists')
                    break;
                
                case 'auth/user-not-found':
                    alert('User does not exist. Please sign up and try again')
                    break;
            }
        }
    ```
    */

    return (
        <div className='sign-in-container'>
            <h2>Already Have An Account?</h2>
            <span>Sign In With Your Email And Password</span>
            <form onSubmit={handleSubmit}>

                <FormInput
                    label='Email' 
                    type='email'
                    required
                    name='email'
                    value={email}
                    onChange={handleChange}
                />

                <FormInput 
                    label='Password'
                    type='password'
                    required
                    name='password'
                    value={password}
                    onChange={handleChange}
                />

                <div className='buttons-container'>
                    <Button 
                        type='submit' 
                        buttonType=''
                    >Sign In </Button>

                    <Button 
                        type='button' 
                        buttonType='google'
                        onClick={signInGoogleUser}
                    >Google Sign in</Button>
                </div> 

            </form>

        </div>
    )
}

export default SignInForm


/*
Note:

This uses almost exactly same structure as the sign up form
I basically copied it and made changes to the objects and form inputs required

Note the different button types; the one with the form has type of 'submit', others with
Google functions which do not rely on form input have type 'button'

I moved the sign in with google function from the sign up page to the sign in page
Brought in the function as well so the button calls in when clicked
*/

// Authentication using User Context to be added shortly
