import { Children } from "react";


const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted'
}

function Button({ children, buttonType, ...otherProps }) {
    return (
        <button 
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}
        >
            {children}
        </button>
    )
}

export default Button;

/*
The button component would have three different styles (i.e classes)
default, inverted and google sign in. This is defined in the BUTTON_TYPE_CLASSES

We then use string interpolation to dynamically select the style. We also import
the props from the button component on the signin component

Remember, 'children', which is passed as a prop above is to import the text written
within the button component. This uses the default react style where stuff are rendered as children
*/