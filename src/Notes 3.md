// Installing and using Redux 

1.  Installed redux, react-redux and react-logger from npm
2.  It is not proper to use context API and redux at the same time as there should be only one single source of truth; so we'll be replacing the context with redux

3.  To setup redux, you create a 'store' folder in your src path, and create a 'store.js' file inside the store folder

The store.js file is where all the redux happens, where the state lives and where actions happen to allow dispatch make changes

4.  Import compose, createStore and applyMiddleware from redux (Note, createStore shows as deprecated when i tried. Would look into this)

5.  We also import logger from 'redux-logger'

6.  The concept of redux makes use of a 'root reducer'. We create a file within the store folder called 'root-reducer.js'

7.  We import combineReducers from redux, which is a method that helps us to create a reducer that helps to combine smaller reducers together

we then export rootReducer

8.  We also create a user.reducer.js file in a user folder under the store folder.
    Study the userReducer 
        ```
        export const USER_ACTION_TYPES = {
            SET_CURRENT_USER: 'SET_CURRENT_USER',
        }

        const INITIAL_STATE = {
            currentUser: null,
        }

        export const userReducer = (state = INITIAL_STATE, action) => {
            const { type, payload } = action;

            switch (type) {
                case USER_ACTION_TYPES.SET_CURRENT_USER:
                    return { ...state, currentUser: payload};
            
                default:
                    return state;
                    //throw new Error(`Unhandled type ${type} in userReducer`)
            }
        };
        ```

9.  We then import this userReducer in our root reducer
```
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    user: userReducer
})
```

10. We made a lot of changes and addition to the store.js. 
11. The 'store' exported in 'store.js' is then used as a reference in the provider used to wrap the <App /> component, and other components wrapping App. It should be top level, even above BrowserRouter

We get this provider by importing { Provider } from 'react-redux'. We also import { store } from our store.js file

    <Provider store={store}>
        <App />
    </Provider>

12. ...because we no longer will be making use of the User Context/Provider files, the useEffect that was in the userProvider file that mounts on load, to enable creation of the currentUser from firebase, will be moved to the App component.

This is because the entire app requires a current user and the app component loads first. We then ensure our imports and the relative paths are still correct

```
useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);   //This creates a user, if the user doesn't already exist, especially when they use the Google sign in
      }

      dispatch(setCurrentUser(user)); //This sets the user to the object received from firebase if signed in, but sets it to null is signed out as defined above
    })

    return unsubscribe;
  }, [])
```

We also remove the <UserProvider> wrapping <App /> in the main jsx file

13. Moved quite a number of code around within the user folder. Created the user.action.js file as well.

14. Now in our navigation component, we also get rid of UserContext.

We import a hook known as useSelector which enables us extract data from Redux, or allow a component interact with the data from the Redux store

We then replace the currentUser with the data from the Redux store using useSelector
    ```const currentUser = useSelector((state) => state.user.currentUser)```

15. So instead of directly passing the state and returning the state's current user, we could just create a separate file for easy readability. We create a user.selector.js file in the user folder. It contains

    export const selectCurrentUser = (state) => state.user.currentUser

16. Similarly, we create a category folder in our store folder. We then create the action, reducer, selector and types files, and setup their respective boilerplate codes as we did with user

17. The useEffect which was formerly in the categories provider which creates the necessary documents in firebase is also moved to the Shop component which houses the categories preview and categories components. This is because, like the App component, the Shop component loads initially before any lower level component that utilizes that useEffect.

```
useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
            //console.log(categoryMap);
        }

        getCategoriesMap();
    }, [])

```

18. We then remove the references to the CategoriesProvider that wrap the App component. Similarly, any references to the CategoriesContext are removed. We reference this in the CategoryPreview and Category components.

In the category component, we replace the line 1 with line 2 as shown below, making sure to also import useSelector and selectCategoriesMap from their respective locations:
    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap)

Similarly, in category preview component, we do the same as shown below:
    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);