import React, { useState, useEffect } from 'react';
import Product from 'components/product';
import productAPI from 'api/product';
import { useDispatch, useSelector } from 'react-redux';
import { getByUser } from 'features/cartSlice';
import { localAuthenticate } from 'utils/localAuth';
import useNotification from 'utils/hooks/notification';

const ProductList = () => {
	const { isAuthenticated } = localAuthenticate();
	const [products, setProducts] = useState([]);
	// const [cartId, setCartId] = useState('');
	const { cart } = useSelector(state => state.cart);
	const cartId = cart.id;
	const { showError, showSuccess } = useNotification();
	const dispatch = useDispatch();

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			// const params = {
			//   _page: 1,
			//   _limit: 10,
			// };
			const response = await productAPI.getAll();
			setProducts(response.data.products);
		} catch (error) {
			console.log('Failed to fetch products: ', error);
		}
	};

	const fetchCart = () => {
		dispatch(getByUser());
	};

	// useEffect(() => {
	// 	if (isAuthenticated) {
	// 		fetchCart();
	// 	}
	// }, [dispatch, isAuthenticated]);

	return (
		<div className='products-box'>
			<div className='container'>
				<div className='row special-list'>
					{products.map((product, index) => (
						<div
							className='col-lg-3 col-md-6 special-grid best-seller'
							key={index}
						>
							<Product
								id={product.id}
								name={product.name}
								price={product.price}
								image={
									product.images.length > 0
										? product.images[0].path
										: 'https://picsum.photos/400'
								}
								cartId={cartId}
								isAuthenticated={isAuthenticated}
								fetchCart={fetchCart}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
