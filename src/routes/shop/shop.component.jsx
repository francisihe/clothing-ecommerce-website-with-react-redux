//import SHOP_DATA from '../../shop-data.json'
// We now replace this data above with the Products context we created

// import { Fragment, useContext } from "react";

// import { CategoriesContext } from "../../contexts/categories.context";
// import ProductCard from "../../components/product-card/product-card.component";
// import './shop.styles.scss'
// import CategoryPreview from "../../components/category-preview/category-preview.component";

// All the above imports and below objects moved into categories preview component

import { Routes, Route} from 'react-router-dom'
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from '../category/category.component';

import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { setCategoriesMap } from '../../store/categories/category.action';
import { useDispatch } from 'react-redux';

function Shop() {

    // We import and use products from products context, and since we're mapping over the products
    // from here, we replace 'SHOP_DATA' with 'products'
    // const { categoriesMap } = useContext(CategoriesContext);

    const dispatch = useDispatch();

    // This creates/retrieves the necessary categories in Firebase
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments('categories');
            dispatch(setCategoriesMap(categoryMap));
        }

        getCategoriesMap();
    }, [])


    return (
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
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

/*
    <Fragment key={title}>
        <h2>{title}</h2>
        <div className="products-container">
            {categoriesMap[title].map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    </Fragment>
*/


/* 
    
        This was added to the code above.

        {
        products.map((product) => (
            <ProductCard 
                key={product.id}
                product={product}
            />
        ))
    
*/


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