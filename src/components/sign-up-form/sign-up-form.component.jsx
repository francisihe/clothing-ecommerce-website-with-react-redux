import { useState, useContext } from 'react'
import { createNewUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
// import { UserContext } from '../../contexts/user.context'
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import './sign-up-form.styles.scss'
import '../button/button.styles.scss'


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


function SignUpForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // Bringing in the setCurrentUser from UserContext. Below we then send the user object details
    // on sign up attempt to the current user by calling the setCurrentUser() function
        // // --removed, now uses onAuthChangeListener
    // const { setCurrentUser } = useContext(UserContext);

    //Function to handle changes in the form input
    function handleChange(event) {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    //Function to reset form fields to default empty object after submission
    function clearForm() {
        setFormFields(defaultFormFields)
    }

    //Function to handle submission of values of form to database
    async function handleSubmit(event) {
        event.preventDefault();
       
       if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
       }

       try {
            const { user } = await createNewUserWithEmailAndPassword(
                email,
                password
            );

            // setCurrentUser(user);    // --removed, now uses onAuthChangeListener

            await createUserDocumentFromAuth(user, { displayName });
            clearForm();

       } catch(error) {
            if (error.code == 'auth/email-already-in-use') {
                alert('User with this email aready exists')
            } else {
                console.log('An error has occured. Please contact support', error);
            }
       }
    }


    return (
        <div className='sign-up-container'>
            <h2>Don't Have An Account With Us?</h2>
            <span>Sign Up With Email And Password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput
                    label='Display Name'
                    type='text'
                    required
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                />

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

                <FormInput 
                    label='Confirm Password'
                    type='password'
                    required
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                />

                <Button 
                    type='submit' 
                    buttonType=''
                >Sign Up </Button>
            </form>
        </div>
    )
}

export default SignUpForm


/*
Note:

This formerly had individual inputs in the form but moved into its own FormInput component with "label" prop passed in

<label>Display Name</label>
<input 
    type='text'
    required
    name='displayName'
    value={displayName}
    onChange={handleChange}
/>

To become:

<FormInput 
    label='Confirm Password'
    type='password'
    required
    name='confirmPassword'
    value={confirmPassword}
    onChange={handleChange}
/>

Note, the buttonType in the button component is blank so it uses the default style in the button styles file
*/