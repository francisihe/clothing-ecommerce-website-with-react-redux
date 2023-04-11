import { createContext, useState, useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener, signUserOut } from "../utils/firebase/firebase.utils";
import { UserContext } from "./user.context";

/*

Moved this UserContext file into its own separate file

// This is the actual content we need that takes in the "default value"
// It is the actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

*/

// A provider is the actual component. The .provider wraps around any component that needs access to the values
// The provider below receives the actual value.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    // //Immediately this mounts, sign user out
    // signUserOut();

    // This runs when this mounts, using the function we imported from firebase utils
    // -- the unsubscribe which by default is returned by Google defined onAuthChanged is used to clean up the function and stop its listening
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);   //This creates a user, if the user doesn't already exist, especially when they use the Google sign in
            }
            
            console.log(user)
            setCurrentUser(user); //This sets the user to the object received from firebase if signed in, but sets it to null is signed out as defined above
        })

        return unsubscribe;
    }, [])

    return (<UserContext.Provider value={value}>{children}</UserContext.Provider>)
}


/*
We now move to the App the index page or main.jsx page to wrap the App component with
<UserProvider></UserProvider>

so it's like

```
<UserProvider>
    <App />
</UserProvider>
```

This allows any component within the app component have access to context
*/