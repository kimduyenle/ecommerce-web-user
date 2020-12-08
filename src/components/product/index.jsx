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
								title='Xem ngay'
							>
								<i className='fas fa-eye'></i>
							</a>
						</li>
					</ul>
					<button
						className='cart'
						onClick={async () => {
							if (!isAuthenticated) {
								showError('Vui lòng đăng nhập để tiếp tục');
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
								showSuccess('Đã thêm vào giỏ hàng');
							} catch (error) {
								showError('Không thể thêm vào giỏ hàng');
							}
						}}
					>
						Thêm vào giỏ hàng
					</button>
				</div>
			</div>
			<div className='why-text'>
				<h4>{name}</h4>
				<h5>${price}</h5>
			</div>
		</div>
	);
};

export default Product;
