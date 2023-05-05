import { useParams } from 'react-router-dom'
import './category.styles.scss'
//import { CategoriesContext } from '../../contexts/categories.context';
import { useEffect, useState, useContext } from 'react';
import ProductCard from '../../components/product-card/product-card.component';

import { useSelector } from 'react-redux';
import { selectCategoriesMap } from '../../store/categories/category.selector';

const Category = () => {

    const { category } = useParams();
    // const { categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap)
    const [products, setProducts] = useState([])

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            <div className='category-product-container'>

                {/* the 'products &&' is required to prevent an error for when it initially renders. Since it is an empty array, 
                    and the categoryMap is fetched async, it won't be fetched on first load, so we used this to ensure it renders after the product has been fetched.
                */}

                {products &&
                    products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default Category