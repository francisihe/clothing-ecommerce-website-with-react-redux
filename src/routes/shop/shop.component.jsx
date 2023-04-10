//import SHOP_DATA from '../../shop-data.json'
// We now replace this data above with the Products context we created

import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";


function Shop() {

    // We import and use products from products context, and since we're mapping over the products
    //from here, we replace 'SHOP_DATA' with 'products'
    const { products } = useContext(ProductsContext);

    return (
        <div>
            {
                products.map(({id, name}) => (
                    <div key={id}>
                        <h1>{name}</h1>
                    </div>
                ))
            }
        </div>
    );
};

export default Shop;

/*

or deconstruct directly as 

            {
                SHOP_DATA.map(({id, name}) => (
                    <div key={id}>
                        <h1>{name}</h1>
                    </div>
                ))
            }


*/