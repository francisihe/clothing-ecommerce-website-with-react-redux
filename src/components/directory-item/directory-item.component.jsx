// import './components/category-item/category-item.scss'
import { useNavigate } from 'react-router';
import './directory-item.styles.scss'

function DirectoryItem({ category }) {

    const { imageUrl, title, route } = category;
    const navigate = useNavigate();

    const onNavigateHandler = () => navigate(route);

    return (
        <div className='category-container' onClick={onNavigateHandler}>
            <div 
                className='background-image' 
                style={{
                backgroundImage: `URL(${imageUrl})`
                }}
            />
            <div className='category-body-container'>
                <h2>{title.toUpperCase()}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    )
}

export default DirectoryItem