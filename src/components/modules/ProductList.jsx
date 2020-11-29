import React, { useState, useEffect } from 'react';
import Product from 'components/product';
import productAPI from 'api/product';
import { useDispatch, useSelector } from 'react-redux';
import { getByUser } from 'features/cartSlice';
import { localAuthenticate } from 'utils/localAuth';
import useNotification from 'utils/hooks/notification';
import CPagination from 'components/cPagination';

const ProductList = () => {
	const { isAuthenticated } = localAuthenticate();
	const [products, setProducts] = useState([]);
	const [latestProducts, setLatestProducts] = useState([]);
	const [bestSellerProducts, setBestSellerProducts] = useState([]);
	// const [cartId, setCartId] = useState('');
	const { cart } = useSelector(state => state.cart);
	const cartId = cart.id;
	const { showError, showSuccess } = useNotification();
	const dispatch = useDispatch();
	// const [pagination, setPagination] = useState({
	// 	activePage: 1,
	// 	itemsCountPerPage: 0,
	// 	totalItemsCount: 0
	// });

	// const handlePageChange = pageNumber => {
	// 	console.log(`active page is ${pageNumber}`);
	// 	setPagination({
	// 		...pagination,
	// 		activePage: pageNumber
	// 	});
	// };

	useEffect(() => {
		fetchProducts();
		fetchLatestProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			// const params = {
			// 	page: pagination.activePage,
			// 	limit: 10
			// };
			const response = await productAPI.getByType(1);
			setProducts(response.data.products);
			// setPagination({
			// 	...pagination,
			// 	itemsCountPerPage: params.limit,
			// 	totalItemsCount: response.data.total
			// });
		} catch (error) {
			console.log('Failed to fetch products: ', error);
		}
	};

	const fetchLatestProducts = async () => {
		try {
			const response = await productAPI.getByType(2);
			setLatestProducts(response.data.products);
		} catch (error) {
			console.log('Failed to fetch products: ', error);
		}
	};

	// const fetchProducts = async () => {
	// 	try {
	// 		// const params = {
	// 		//   _page: 1,
	// 		//   _limit: 10,
	// 		// };
	// 		const response = await productAPI.getByType(1);
	// 		setProducts(response.data.products);
	// 	} catch (error) {
	// 		console.log('Failed to fetch products: ', error);
	// 	}
	// };

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
				<div className='row'>
					<div className='col-lg-12'>
						<div className='title-all text-center'>
							<h1>Featured Products</h1>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit
								amet lacus enim.
							</p>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='special-menu text-center'>
							<div className='button-group filter-button-group'>
								<button className='active' data-filter='.all'>
									Tất cả
								</button>
								<button data-filter='.top-featured'>Mới nhất</button>
								<button data-filter='.best-seller'>Bán chạy</button>
							</div>
						</div>
					</div>
				</div>
				<div className='row special-list'>
					{products.map((product, index) => (
						<div className='col-lg-3 col-md-6 special-grid all' key={index}>
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
					{latestProducts.map((product, index) => (
						<div
							className='col-lg-3 col-md-6 special-grid top-featured'
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
				{/* <div className='row'>
					<CPagination {...pagination} handlePageChange={handlePageChange} />
				</div> */}
			</div>
		</div>
	);
};

export default ProductList;
