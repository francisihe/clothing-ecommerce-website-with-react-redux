import { createContext, useState } from "react";


// This is the actual content we need that takes in the "default value"
// It is the actual value we want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});

// A provider is the actual component. The .provider wraps around any component that needs access to the values
// The provider below receives the actual value.
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

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