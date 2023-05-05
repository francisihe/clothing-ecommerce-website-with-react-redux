import { Fragment, useContext } from "react";

//import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/category.selector";

function CategoriesPreview() {

    // We import and use products from products context, and since we're mapping over the products
    //from here, we replace 'SHOP_DATA' with 'products'
    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);

    return (
        <Fragment>
            {/* This retrieves the keys from the object in categoriesMap, mapping over each and returning title and product card 
                You can reference the database structure at the bottom of this page to understand the title mapping below better
            */}

            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];

                    return <CategoryPreview
                        key={title}
                        title={title}
                        products={products}
                    />
                }
            )};

        </Fragment>
    );
};

export default CategoriesPreview;