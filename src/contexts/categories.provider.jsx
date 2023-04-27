import { useEffect, useState } from "react";
import { CategoriesContext } from "./categories.context";

import SHOP_DATA from '../shop-data.js'
//import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


// Now utilizing the shop-data.js instead
// import PRODUCTS from '../shop-data.json'

/*

Moved this products context section into its own file

export const ProductsContext = createContext({
    products: [],
})
*/

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({}); //formerly initialized with PRODUCTS but now empty array
    
    // Function to add categories and data to the database using function defined in firebase utils file
    // This is a one-off process as to write the categories. It is then removed to prevent writing everytime the code runs.
    // --this is usually not done on the frontend but backend.
    /*
    useEffect(() => {
        addCollectionAndDocuments('categories', SHOP_DATA);
    }) 
    */

    // This function runs to retrieve the category map from the already defined function in utils
    // --again note that you can't call async function directly on useEffect, instead you create one within it as we've done below
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
            //console.log(categoryMap);
        }

        getCategoriesMap();
    }, [])


    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};