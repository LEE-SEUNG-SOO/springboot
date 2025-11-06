import { useEffect } from 'react';
import { ProductAvatar } from './ProductAvatar.jsx';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProductList } from '../../feature/product/productAPI.js';

export function ProductList() {
    const dispatch = useDispatch();
    const productList = useSelector( state => state.product.productList );
    const number = useSelector( state => state.product.number );

    useEffect( () => {
       dispatch(getProductList(number));
    },[number]);

    return (
        <div>
            {
                productList && productList.map( (productArray, idx) =>
                    <div className='product-list' key={idx}>
                        { productArray && productArray.map( product => 
                            <Link to={`/products/${product.pid}`}><ProductAvatar img={product.image}/></Link>
                        )}
                    </div>
                )
            }
        </div>
    );
}