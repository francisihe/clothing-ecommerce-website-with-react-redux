import { useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './routes/home/home.component.jsx'
import Navigation from './routes/navigation/navigation.component.jsx'
import Authentication from './routes/authentication/authentication.component.jsx'
import Shop from './routes/shop/shop.component.jsx'
import Checkout from './routes/checkout/checkout.component.jsx'

import { createUserDocumentFromAuth, onAuthStateChangedListener } from './utils/firebase/firebase.utils.js'
import { setCurrentUser } from './store/user/user.action.js'
import { useDispatch } from 'react-redux'

function App() {
  //This alows us to interact with the Redux store
  const dispatch = useDispatch()

// Creates the User from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);   //This creates a user, if the user doesn't already exist, especially when they use the Google sign in
      }

      dispatch(setCurrentUser(user)); //This sets the user to the object received from firebase if signed in, but sets it to null is signed out as defined above
    })

    return unsubscribe;
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;