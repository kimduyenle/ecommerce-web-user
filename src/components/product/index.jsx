import React from 'react';
import { useHistory } from 'react-router-dom';
import useNotification from 'utils/hooks/notification';
import cartDetailAPI from 'api/cartDetail';
import cartAPI from 'api/cart';
// import { useDispatch } from 'react-redux';
import { getByUser } from 'features/cartSlice';

const Product = ({
	id,
	name,
	price,
	image,
	cartId,
	isAuthenticated,
	fetchCart
}) => {
	const history = useHistory();
	const { showError, showSuccess } = useNotification();
	// const dispatch = useDispatch();
	return (
		<div className='products-single fix'>
			<div className='box-img-hover'>
				<div className='type-lb'>
					<p className='sale'>Sale</p>
				</div>
				<img src={image} className='img-fluid' alt='' />
				<div className='mask-icon'>
					<ul>
						<li>
							<a
								onClick={e => {
									e.preventDefault();
									history.push({
										pathname: '/product-detail',
										search: `?id=${id}`
									});
								}}
								href='/product-detail'
								data-toggle='tooltip'
								data-placement='right'
								title='View'
							>
								<i className='fas fa-eye'></i>
							</a>
						</li>
						<li>
							<a
								href='/'
								data-toggle='tooltip'
								data-placement='right'
								title='Compare'
							>
								<i className='fas fa-sync-alt'></i>
							</a>
						</li>
						<li>
							<a
								href='/'
								data-toggle='tooltip'
								data-placement='right'
								title='Add to Wishlist'
							>
								<i className='far fa-heart'></i>
							</a>
						</li>
					</ul>
					<button
						className='cart'
						onClick={async () => {
							if (!isAuthenticated) {
								showError('Please login to continue.');
								return;
							}
							try {
								const quantity = 1;
								const response = await cartDetailAPI.add({
									productId: id,
									cartId,
									quantity,
									price
								});
								await fetchCart();
								showSuccess('Added successfully.');
							} catch (error) {
								showError('Failed to add to cart.');
							}
						}}
					>
						Add to Cart
					</button>
				</div>
			</div>
			<div className='why-text'>
				<h4>{name}</h4>
				<h5>{price}</h5>
			</div>
		</div>
	);
};

export default Product;
