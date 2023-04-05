import { useState } from 'react'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}



function SignUpForm() {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    function handleChange(event) {
        const { name, value } = event.target;
        setFormFields({...formFields, [name]: value})
    }

    console.log(formFields)

    return (
        <div>
            <h1>Sign Up With Email And Password</h1>
            <form>
                <label>Display Name</label>
                <input 
                    type='text'
                    required
                    name='displayName'
                    value={displayName}
                    onChange={handleChange}
                />

                <label>Email</label>
                <input 
                    type='email'
                    required
                    name='email'
                    value={email}
                    onChange={handleChange}
                />

                <label>Password</label>
                <input 
                    type='password'
                    required
                    name='password'
                    value={password}
                    onChange={handleChange}
                />

                <label>Confirm Password</label>
                <input 
                    type='password'
                    required
                    name='confirmPassword'
                    value={confirmPassword}
                    onChange={handleChange}
                />
            </form>
        </div>
    )
}

export default SignUpForm