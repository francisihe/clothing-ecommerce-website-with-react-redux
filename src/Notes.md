1.  Basic installation of react using Vite or similar
3.  Create data source (or categories object)
2.  Install sass (npm add sass)
4.  Create components and extend props
5.  Install React Router (npm install react-router-dom or react-router-dom@6)
6.  Import { BrowserRouter } from "react-router-dom" into the main.jsx file (or wherever your <App /> is rendered)
7.  Wrap the <App /> component with the <BrowserRouter></BrowserRouter> as such:

`
<BrowserRouter>
    <App />
</BrowserRouter>
`

8.  Initially, the App page was rendering the directory, now we want it to render the different routes
9.  Setup the routes folder in the src directory
10. Setup a <Home /> in the route, move the code in the <App /> file into Home to enable you render the <Home /> component instead. Dont forget to fix the relative paths of your imports. Test if it still works fine.
11. Import {Routes, Route} from 'react-router-dom' in the App file
12. You wrap everything with the <Routes></Routes> with <Route /> nested within it.

Note that <Route /> requires a "path" attribute and an "element" attribute. 

"path" points to the url structure after the domain, "element" chooses which component to render as shown below

`
<Routes>
    <Route path='/' element={<Home />}/>
</Routes>
`

NOTE: The parent path "/" is usually to render the navigation component as this is displayed on every page on loading the domain. Now, since the initial page will usually host the Home component as well, you declare this using 'index' and the element as such:

`
<Routes>
    <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
    </Route>
</Routes>
`

13. NOTE: Nested route is also possible. You do this by using an opening and closing tag of <Route></Route>. This makes the nested route path relative to the parent route

14. NOTE: Even when you indicate a relative route within a parent route, the component being rendered on the parent route will still render even if you navigate to the child component path unless you declare an <Outlet /> within the parent component, indicating where you want the other components to render.

15. You import { Outlet } from 'react-router-dom', and declare <Outlet /> within the area you need other sub routes displayed.

Refer to the code sample above, the <Navigation /> component will have the <Outlet /> below the content within the render area to allow every other component be able to display on the app

16. Create the Navigation component under routes. Within the Navigation details, include the <Outlet /> component.

17. Another component that can be imported is {Fragment} and used as <Fragment /> to render stuff to the page. Also can be <></> with the content within

18. { Link } imported from 'react-router-dom' works exactly as anchor elements <a></a> do. It takes the attribute "to" to refer to the browser/url path

<Link className="nav-link" to="/shop">
    Shop
</Link>

19. Create your Navigation component, include the logo, logo image, do proper linking to home page, add links in the navigation bar


// Firebase Authentication Addition

1.  Go to Firebase console, create a new project
2.  Install firebase library using 'npm add firebase' in your project folder
3.  Create authentication page route. Add the route in your App file, also add navigation link to app
4.  Create 'Utils' folder in src folder
5.  Within utils, create firebase folder, with firebase.js (or firebase.utils.js) file
6.  To make use of firebase authentication, we need to import sthings from its app suite 'firebase/app'
7.  Import { initializeApp } from 'firebase/app'
8.  Within Firebase console, navigate to the 'web' of your app, give it a nickname, click register app.
9.  Copy the configuration details into your firebase file
10. Next, import the authentication library and the needed methods

`
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider
 } from "firebase/auth";
`

11. To use Google's auth service, initialize it as a provier: const provider = new GoogleAuthProvider();

12. Set custom parameters to be sent with the request:
`
provider.setCustomParameters({
  'login_hint': 'user@example.com'
  prompt: "select_account"
});
`

In this case, it is set to 'prompt: "select_account"' to prompt the user to select an account

13. After initializing the provider, export the codes. Note that the const Google Popup is a custom name. The regular is the function being run witin 
`
xport const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
`

14. Navigate to Firebase authentication menu, select the sign-in providers needed. In this case, Google first.

15. In our authentication component, we import the methods we need/exported such as 'signInWithGooglePopup'

16. To make use of the Firestore database, we go to the Firebase console, create a database, select production, select a location and enable.

Navigate to "Rules" and change false to true below and save changes:

`
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false; //this should be changed to true
    }
  }
}
`

17. In our firebase utils file, we also import some methods from 'firebase/firestore'. These include getFirestore, doc (allows you instantiate a document), getDoc (allows you to access the data in a document) and setDoc (allows you set the data in a documment) method. 

18. After writing the code to allow you create user if user doesn't exist, and simply return the user's details if the user exists.

19. In the authentication file, we called both functions to allow the prompt for signing in/signing up the user and creating a new user if it doesn't exist.

20. NOTE: When implementing the GoogleSignin using redirect, with the use of useEffect, note that you cannot directly use async in the useEffect's function. Instead, create another named function within the useEffect function, place your code inside, and then call the same function again to enable the code run when it mounts and remounts.

Import {useEffect} from react, import {gerRedirectResult} from 'firebase/auth', import the {signInWithGoogleRedirect, auth} from the firebase utils file.

`
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
`

22. To enable the native Email/Password option to allow us use sign in/sign up forms, go to the firebase console, turn on the Email/Password option.

23. Create your sign up component with your form within it. Within yout form component, don't forget to instantiate your form with useState. Create an object with empty strings for the default values. Ensure the 'name' for each input matches the same name in the default object.

24. Import the createUserWithEmailAndPassword from 'firebase/auth' inside the util file. Create the handleSubmit function which takes in the created email and password, and sends it to the database by calling the createUserDocumentFromAuth() function with user passed in.

Note that when creating with email and password, you need to also pass a display name. Minor changes were made to the User Document Creation Function in utils to also pass in "additionalInformation" as an object when creating a user. This helps the displayName to be passed as well to the database

25. Moved the individual form inputs in the sign up form into a form-input component instead, and displaying form input components while passing in the appropriate props. This is to help with better styling and passing less or more props for where i will use the same form input for the sign in component to be created.

26. Apply appropriate styling necessary to the form and form input components. Next, make a button component since it is used in multiple places with different and similar styles. Import the button component into the form input componenet. 

NOTE: Do not forget to indicate the 'type' within the button which is inside the form. Usually, any button within a form has default type of submit which sends the form content to a server or backend or database. Now that we have the button as a component, we need to clearly indicate the type as "submit". If it were a regular button anywhere else but within a form, we indicate the type as "button"

27. Create the sign in component as well as use the appropriate authentication functions from the firebase utils file. Check the "notes on authentication" within the firebase folder for some direction on Google Login and Sign Up using pop up and redirect


// User Context 

1.  Context is sort of a component that holds data for use at almost any level in your app without needing to "prop drill" through different components. Context is like a storage place except it is a component that wraps around all your components that need access to context. It exclusively stores things

In this case, we'll see how we use UserProvider, a context, to wrap our <App />

2.  Create a "contexts" folder in your src folder. Create a "user components" jsx file within it.

3.  In the user.context.jsx file, import {createContent} from react, and export the UserProvider. Wrap the App component with the UserProvider. (check the usercontext file for more comments)

4.  In the sign in form, where we need to initially validate if a user is signed in or not, we capture the user object when a user signs in within the sign in component. 
We then import '{useContext}' from react as well as import the {UserContext} from our user.context.jsx. A function "setUserContext(user)" runs when a new user attempts sign in and is created, and then sent to the User Context file. 

5.  We also want to be able to access the current state of the user (user value only, not the setter function) in the navigation panel so we import {useContext} from react and also import the {UserContext} from the user context file. 

We then get the value of the current user using:
const { currentUser } = useContext(UserContext);

6.  We also want to use similar in our Sign Up component, so as to authenticate the user and store the user value on sign up. 

7.  For both our sign in and sign up forms, we executed conditional rendering of the "sign in" link, such that when signed in, it displays 'sign out' and vice versa

8.  Moved User context functions within sign in and sign up forms to authentication. Here the 'onAuthStateChanged' from firebase is utilized. We removed them from the forms since Google's method handles this better, and prevents us from having to rerun the functions within the sign in and sign up needlessly on every auth change, meaning better performance

9.  Within the navigation component, we also did the same by removing the setCurrentUser function but we retained the function that allows us check the current user.


// Setting Up Shop With Products

1.  I inserted the products data into a shop-data JSON file
2.  Created the Shop component which renders on the Shop route in the App file
3.  Recall that to have global access to the products, just as we have global access to the user, we need to create a 'Products Provider'

4.  We created a Products Provider. Similarly, we need to wrap our App component with our Products Provider, just as we wrapped our App component with the User Provider.

Now, recall that we may need to access "users" while dealing with products, so it is important that the Products Provider is nested within the User Provider. So it ends up looking like this:

```
<React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <App />
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
```

5.  In our shop component, instead of directly mapping over the data in the raw data page, we now insert our Products Context and map over that instead. (Recall, the Product Context, now maps over the raw data)

6.  Note that you may run into the error: 
hmr invalidate /src/contexts/user.context.jsx Could not Fast Refresh. Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports

This is because the User Context and User Provider export codes are in the same file. They need to be separated and fixed in separate files.

7.  We then create the product card component, and it's style file as well. Added styling to the shop component too.

8.  Created the Cart Icon, created the Cart Dropdown, added their respective styling

9.  To enable the cart icon work properly on click, we created the toggle function. This required us to create the isCartOpen and setIsCartOpen state in the cart context file

10.  We created the cart list component which holds the data that'll be displayed on the cart dropdown

11. We moved to creating the cart functionality, that is, when "add to cart" on the product page is clicked, it adds the item to the cart dropdown but if the item already exists, it increases its quantity

This required us adding 'cartItems: [] and 'addItemToCart: () => {}' to the cart context. We then defined the logic in the cart provider file to enable this functionality. 

Study this:

```
//Helper function to look through the cart, to determine if to add or increase the quantity of already contained product
const addCartItem = (cartItems, productToAdd) => {

    // check if cartItems already has productToAdd
    // -- basically says check each item's id, if equal to products id, return boolean
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    // map over the cart items to create a similar array, if it does contain an item, increase quantity by 1, else return existing items in the cart
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    };

    // return array with modified cartItems with new item in it
    return [...cartItems, {...productToAdd, quantity: 1}];
}

```

This below was then added in the provider section, just below where the states are declared:

```
//The addItemToCart function with the cartItems and productToAdd args are in the context file
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
```

For every extra function, array, object or boolean defined in the context file, do not forget to expose the values in the value section of the provider. See Cart Context and Cart Provider files for understanding.


12. We fix the count in the cart icon. To do this, we add a 'cartCount: 0' to our Cart Context. Then we add the state to the Cart Provider. We then use the useEffect hook in the provider, which is dependent on the cartItems so on change, it recalculates

We utilize the .reduce() method:
```
useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])
```

Do not forget to add the cartCount to the values as well
const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount };


13. Then import the cartCount to the CartIcon component and use the cartCount holder placeholder within



// Creating the Checkout Page, 
-- also fixing the link of the checkout button in the cart component

1.  Create a checkout component in the routes folder. Declare a new route in the App file with the checkout path and element.

2.  Within the cart component, there is a checkout button. We want to be able to click that button and navigate to the checkout page as well. Instead of using a "<Link />" we use another react hook "useNavigate" from "react-router-dom"

useNavigate gives us a function useNavigate() 

```
const navigate = useNavigate()

    // Function that utilizes the navigate above which we use in the onclick for the checkout button
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    }
```

We then use this for the onClick for our checkout button

3.  We then go ahead to developing our checkout page. Import the useContext hook and CartContext file. We then map over the cartItems and display the items in the cart

4.  To build the quantity function, remember we already have the "addItemToCart" functionality which is in the cart provider file. Note: When using the function, declare it within the hidden callback function as it crashes the app if called directly. Also, do not forget to include the arg 'product' to avoid adding undefined products to the cart.

5.  We then create the function to remove an item from the cart. We first declare the 'removeItemFromCart' function in the context file.

In our cart provider, we then write the helper function 'removeCartItem' which 'removeItemFromCart' calls, with the required cartItem arg

6.  We then created all the necessary headers within the component page, created our 'component-item' components with their respective styling, and imported it into the checkout page.

7.  Went on to write the respective codes for calculating the cartTotal, and deleteItemFromCart using similar steps already described. 