// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
 } from "firebase/auth";
 import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
 } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKPeW1h-pN0RDCYMoanSanx5uglCg6n84",
  authDomain: "clothing-website-dd17b.firebaseapp.com",
  projectId: "clothing-website-dd17b",
  storageBucket: "clothing-website-dd17b.appspot.com",
  messagingSenderId: "597115610097",
  appId: "1:597115610097:web:71c8f6bc7e684937845a50"
};

// Initialize Firebase
// Note This below was 'app' but i renamed it to 'firebaseApp'
const firebaseApp = initializeApp(firebaseConfig);


// Add Google Auth as a provider and set a custom parameter to be prompt and to urge user to select account
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
  });

// //Refer to Firebase documentation for this implementation below
// const auth = getAuth();
// signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // IdP data available using getAdditionalUserInfo(result)
//     // ...
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });


// We export auth here and created a custom name for Google Provider that runs the popup function that's already available in firebase
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

// We set the database to access the Firestore database
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();

// This function helps us add documents to the database. We get a collection ref from firestore, and create documents
// -- we pass the key (just like users, this for categories)
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    
    await batch.commit()
    //console.log('done')

    // Note that the data could be different, so instead of directly passing in 'title' in the docRef, we could use a third argument, 'field', and then pass in 'field' instead for dynamic data
    // --those two lines could then be these:
    /*
    const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field = 'title')
    const docRef = doc(collectionRef, object.field.toLowerCase());
    */
}

// This function helps us retrieve data already existing in the Firestore database
// Check the structure of the data below the code block
export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}

/*
It's supposed to help get this structure for each category:

{
    hats: {
        title: 'Hats',
        items: [
            {},
            {}
        ]
    },
    
    sneakers: {
        title: 'Sneakers',
        items: [
            {},
            {}
        ]
    }
}
*/


// Referencing the db, we create a user (or user document) in the 'users' collection
// It creates a user with a unique id (uid in this case, as seen in the user object generated in the console) 
// Basically, for eachUser, create a new user using eachUser.uid as though you were mapping. Also export it for use

export const createUserDocumentFromAuth = async (
        userAuth, 
        additionalInformation = {}
    ) => {
    
    // Receives the user details, and additional Information if any (such as display name on signup form) etc as an object
    //if no userAuth, don't run
    if (!userAuth) return;
    
    const userDocRef = doc(db, 'users', userAuth.uid);

    //SnapShot is basically to check the existence of a data (user in this case)
    const userSnapshot = await getDoc(userDocRef)

    //if user does not exist, --
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        // -- create a user using setDoc with the users displayName, email and createdAt
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation //passes in any additional information received
            })
        } catch (error) {
            //display the error and error message
            console.log('error creating user', error.message);
        }
    }

    //if the user exists, --
    //the if statement above will return true so we'll just return the user 

    return userDocRef;
}

// Here we create define our function with our custom name which calls the already defined function
// within firebase to enable creating a user with email and password

export const createNewUserWithEmailAndPassword = async (email, password) => {
    //if no email or password received, don't run
    if (!email || !password) return;

    //calls the defined Google method which receives auth, email and password
    return await createUserWithEmailAndPassword(auth, email, password);
}

// Sign in user using Email and Password

export const signUserInWithEmailAndPassword = async (email, password) => {
    //if no email or password received, don't run
    if (!email || !password) return;

    //calls the defined Google method which receives auth, email and password
    return await signInWithEmailAndPassword(auth, email, password);
}

// Sign out a user
export const signUserOut = async () => await signOut(auth);

// Function to monitor changes to auth for user sign ins and outs
// -- the callback is self defined, it runs when the auth changes
// -- note than this permanenently listens, and therefore can be a memory leak. Therefore, after it has been used,
// -- it is important to stop it, using the already defined method "unsubscribe" wherever it is called
// -- in this case, in the user context file
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)