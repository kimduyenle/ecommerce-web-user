import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { bool } from 'prop-types';
import { Menu, MenuItem, Button } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import logo from 'assets/images/logo.png';
import { localAuthenticate } from 'utils/localAuth';
import { useDispatch, useSelector } from 'react-redux';
import { getByUser } from 'features/cartSlice';
import { getProfile } from 'features/userSlice';
import calTotal from 'utils/calTotal';

const Header = () => {
	const [accountMenuOpen, setAccountMenu] = useState(false);
	const toggleAccountMenu = e => {
		e.stopPropagation();
		setAccountMenu(pre => !pre);
	};
	const handleCloseAccountMenu = () => {
		setAccountMenu(false);
	};
	const { cart } = useSelector(state => state.cart);
	const { user } = useSelector(state => state.user);
	const pathname = useLocation().pathname;

	const history = useHistory();
	const { isAuthenticated, tokenInfo } = localAuthenticate();
	// const [cart, setCart] = useState({
	// 	user: { username: '' },
	// 	cartDetails: []
	// });
	const dispatch = useDispatch();

	useEffect(() => {
		// fetchCart();
		if (isAuthenticated) {
			dispatch(getByUser());
			dispatch(getProfile());
		}
	}, [dispatch, isAuthenticated]);

	// const fetchCart = async () => {
	// 	try {
	// 		const response = await cartAPI.getByUser();
	// 		const fetchedCart = response.data.cart;
	// 		setCart({
	// 			username: fetchedCart.user.username,
	// 			cartDetails: fetchedCart.cartDetails
	// 		});
	// 	} catch (error) {
	// 		console.log('Failed to fetch cart: ', error);
	// 	}
	// };

	useEffect(() => {
		if (accountMenuOpen) {
			window.addEventListener('click', handleCloseAccountMenu);
			return () => window.removeEventListener('click', handleCloseAccountMenu);
		}
	}, [accountMenuOpen]);

	return (
		<div>
			<div className='main-top'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'></div>
						<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
							{/* <div className="custom-select-box">
                        <select id="basic" className="selectpicker show-tick form-control" data-placeholder="$ USD">
						<option>¥ JPY</option>
						<option>$ USD</option>
						<option>€ EUR</option>
					</select>
                    </div> */}
							<div className='our-link'>
								<ul>
									{isAuthenticated ? (
										<>
											<li className='username'>{user.username}</li>
											<li className='avatar' style={{ borderRight: 'none' }}>
												<NavLink to='/profile'>
													<img src={user.avatar} alt='' />
												</NavLink>
											</li>
											<li className='account-menu'>
												<button onClick={toggleAccountMenu}>
													<MoreVertIcon />
												</button>
												{accountMenuOpen && (
													<ul>
														<li>
															<NavLink to='/profile'>Hồ sơ</NavLink>
														</li>
														<li>
															<NavLink to='/my-product'>
																Sản phẩm của tôi
															</NavLink>
														</li>
														<li>
															<NavLink to='/my-order'>Đơn mua</NavLink>
														</li>
														<li>
															<NavLink to='/order'>Đơn bán</NavLink>
														</li>
														<li>
															<NavLink to='/logout'>Đăng xuất</NavLink>
														</li>
													</ul>
												)}
											</li>
										</>
									) : (
										<>
											<li>
												<button
													onClick={() => {
														history.push('/login');
													}}
													className='btn'
												>
													Login
												</button>
											</li>
											<li>
												<button
													onClick={() => {
														history.push('/register');
													}}
													className='btn'
												>
													Register
												</button>
											</li>
										</>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<header className='main-header'>
				<nav className='navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav'>
					<div className='container'>
						<div className='navbar-header'>
							<button
								className='navbar-toggler'
								type='button'
								data-toggle='collapse'
								data-target='#navbar-menu'
								aria-controls='navbars-rs-food'
								aria-expanded='false'
								aria-label='Toggle navigation'
							>
								<i className='fa fa-bars'></i>
							</button>
							<a className='navbar-brand' href='index.html'>
								<img src={logo} className='logo' alt='' />
							</a>
						</div>

						<div className='collapse navbar-collapse' id='navbar-menu'>
							<ul
								className='nav navbar-nav ml-auto'
								data-in='fadeInDown'
								data-out='fadeOutUp'
							>
								<li className='nav-item active'>
									<a className='nav-link' href='index.html'>
										Home
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='about.html'>
										About Us
									</a>
								</li>
								<li className='dropdown megamenu-fw'>
									<a
										href='/'
										className='nav-link dropdown-toggle arrow'
										data-toggle='dropdown'
									>
										Product
									</a>
									<ul className='dropdown-menu megamenu-content' role='menu'>
										<li>
											<div className='row'>
												<div className='col-menu col-md-3'>
													<h6 className='title'>Top</h6>
													<div className='content'>
														<ul className='menu-col'>
															<li>
																<a href='shop.html'>Jackets</a>
															</li>
															<li>
																<a href='shop.html'>Shirts</a>
															</li>
															<li>
																<a href='shop.html'>Sweaters & Cardigans</a>
															</li>
															<li>
																<a href='shop.html'>T-shirts</a>
															</li>
														</ul>
													</div>
												</div>
												<div className='col-menu col-md-3'>
													<h6 className='title'>Bottom</h6>
													<div className='content'>
														<ul className='menu-col'>
															<li>
																<a href='shop.html'>Swimwear</a>
															</li>
															<li>
																<a href='shop.html'>Skirts</a>
															</li>
															<li>
																<a href='shop.html'>Jeans</a>
															</li>
															<li>
																<a href='shop.html'>Trousers</a>
															</li>
														</ul>
													</div>
												</div>
												<div className='col-menu col-md-3'>
													<h6 className='title'>Clothing</h6>
													<div className='content'>
														<ul className='menu-col'>
															<li>
																<a href='shop.html'>Top Wear</a>
															</li>
															<li>
																<a href='shop.html'>Party wear</a>
															</li>
															<li>
																<a href='shop.html'>Bottom Wear</a>
															</li>
															<li>
																<a href='shop.html'>Indian Wear</a>
															</li>
														</ul>
													</div>
												</div>
												<div className='col-menu col-md-3'>
													<h6 className='title'>Accessories</h6>
													<div className='content'>
														<ul className='menu-col'>
															<li>
																<a href='shop.html'>Bags</a>
															</li>
															<li>
																<a href='shop.html'>Sunglasses</a>
															</li>
															<li>
																<a href='shop.html'>Fragrances</a>
															</li>
															<li>
																<a href='shop.html'>Wallets</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</li>
								<li className='dropdown'>
									<a
										href='/'
										className='nav-link dropdown-toggle arrow'
										data-toggle='dropdown'
									>
										SHOP
									</a>
									<ul className='dropdown-menu'>
										<li>
											<a href='cart.html'>Cart</a>
										</li>
										<li>
											<a href='checkout.html'>Checkout</a>
										</li>
										<li>
											<a href='my-account.html'>My Account</a>
										</li>
										<li>
											<a href='wishlist.html'>Wishlist</a>
										</li>
										<li>
											<a href='shop-detail.html'>Shop Detail</a>
										</li>
									</ul>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='service.html'>
										Our Service
									</a>
								</li>
								<li className='nav-item'>
									<a className='nav-link' href='contact-us.html'>
										Contact Us
									</a>
								</li>
							</ul>
						</div>

						<div className='attr-nav'>
							<ul>
								<li className='search'>
									<a href='/'>
										<i className='fa fa-search'></i>
									</a>
								</li>
								{isAuthenticated && (
									<li className='side-menu'>
										<a href={pathname}>
											<i className='fa fa-shopping-bag'></i>
											<span className='badge'>{cart.cartDetails?.length}</span>
										</a>
									</li>
								)}
							</ul>
						</div>
					</div>
					<div className='side'>
						<a href='/' className='close-side'>
							<i className='fa fa-times'></i>
						</a>
						<li className='cart-box'>
							<ul className='cart-list'>
								{cart.cartDetails?.map((detail, index) => (
									<li key={index}>
										<a href='/' className='photo'>
											<img
												src={detail.product.images[0].path}
												className='cart-thumb'
												alt=''
											/>
										</a>
										<h6>
											<a href='/'>{detail.product.name}</a>
										</h6>
										<p>
											{detail.quantity}x -{' '}
											<span className='price'>{detail.price}</span>
										</p>
									</li>
								))}
								<li className='total'>
									<NavLink
										className='btn btn-default hvr-hover btn-cart'
										to='/cart'
									>
										VIEW CART
									</NavLink>
									<span className='float-right'>
										<strong>Total</strong>: {calTotal(cart.cartDetails)}
									</span>
								</li>
							</ul>
						</li>
					</div>
				</nav>
			</header>

			<div className='top-search'>
				<div className='container'>
					<div className='input-group'>
						<span className='input-group-addon'>
							<i className='fa fa-search'></i>
						</span>
						<input type='text' className='form-control' placeholder='Search' />
						<span className='input-group-addon close-search'>
							<i className='fa fa-times'></i>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

Header.propTypes = {
	isAuthenticated: bool
};
export default Header;
