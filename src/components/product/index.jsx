import React from 'react';
import { useHistory } from 'react-router-dom';
// import img from 'assets/images/img-pro-01.jpg';

const Product = ({ id, name, price, image }) => {
	const history = useHistory();
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
					<a className='cart' href='/'>
						Add to Cart
					</a>
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
