import { createContext } from "react";

export const CategoriesContext = createContext({
    categoriesMap: {},
})

/*

Moved the provider section into its own file

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    return (
        <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
    );
};

*/