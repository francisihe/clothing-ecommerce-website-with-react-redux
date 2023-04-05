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

22. 