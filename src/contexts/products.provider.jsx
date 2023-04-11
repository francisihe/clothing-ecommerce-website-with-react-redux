import { useState } from "react";
import { ProductsContext } from "./products.context";

import PRODUCTS from '../shop-data.json'

/*

Moved this products context section into its own file

export const ProductsContext = createContext({
    products: [],
})
*/

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};