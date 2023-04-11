//import SHOP_DATA from '../../shop-data.json'
// We now replace this data above with the Products context we created

import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss'

function Shop() {

    // We import and use products from products context, and since we're mapping over the products
    //from here, we replace 'SHOP_DATA' with 'products'
    const { products } = useContext(ProductsContext);

    return (
        <div className="products-container">
            {
                products.map((product) => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
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