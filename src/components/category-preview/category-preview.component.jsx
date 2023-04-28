import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss'


const CategoryPreview = ({ title, products }) => {

    return (
        <div className='category-preview-container'>
            
            <h2>
                <Link to={title}>
                    <span className='title'>{title.toUpperCase()}</span>
                </Link>
            </h2>

            <span>
                <Link>
                    <span>View Entire Collection In {title.slice(0, 1).toUpperCase()}{title.slice(1)}</span>
                </Link>
            </span>

            <div className='preview'>
                {
                    /* This filters using index less than 4 then maps over returning the product card */

                    products
                        .filter((_, index) => index < 4)
                        .map((product) =>
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        )
                }
            </div>

        </div>
    )
}

export default CategoryPreview;