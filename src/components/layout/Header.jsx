import React from 'react';
import { useHistory } from 'react-router-dom';
import { bool } from 'prop-types';
import logo from 'assets/images/logo.png';
import itemOne from 'assets/images/img-pro-01.jpg';
import itemTwo from 'assets/images/img-pro-02.jpg';
import itemThree from 'assets/images/img-pro-03.jpg';

// const NavMenuDropdown = ({ open = true }) => {
//   if (!open) {
//     return null
//   }
//   return (
//     <div className="nav_menu__dropdown animate__animated animated_bounceInDownOrigin absolute right-0 z-1 inline-block text-left">
//       <div className="bg-purple-barney origin-top-right right-0 mt-2 w-56 rounded-md shadow-lg">
//         <div className="rounded-md shadow-xs pt-24">
//           <div
//             className="py-1"
//             role="menu"
//             aria-orientation="vertical"
//             aria-labelledby="options-menu"
//           >
//             <a
//               href="/"
//               className="block px-4 py-2 text-sm leading-5 text-primary hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
//               role="menuitem"
//             >
//               Account settings
//             </a>
//             <a
//               href="/"
//               className="block px-4 py-2 text-sm leading-5 text-primary hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
//               role="menuitem"
//             >
//               Support
//             </a>
//             <a
//               href="/"
//               className="block px-4 py-2 text-sm leading-5 text-primary hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
//               role="menuitem"
//             >
//               License
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

const Header = () => {
	// const [navMenuOpen, setNavMenu] = useState(false)
	// const toggleNavMenu = useCallback(() => {
	//   setNavMenu(pre => !pre)
	// }, [])

	const history = useHistory();

	return (
		<div>
			<div className='main-top'>
				<div className='container-fluid'>
					<div className='row'>
						<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
							{/* <div className="text-slid-box">
                        <div id="offer-box" className="carouselTicker">
                            <ul className="offer-box">
                                <li>
                                    <i className="fab fa-opencart"></i> Off 10%! Shop Now Man
                                </li>
                                <li>
                                    <i className="fab fa-opencart"></i> 50% - 80% off on Fashion
                                </li>
                                <li>
                                    <i className="fab fa-opencart"></i> 20% off Entire Purchase Promo code: offT20
                                </li>
                                <li>
                                    <i className="fab fa-opencart"></i> Off 50%! Shop Now
                                </li>
                                <li>
                                    <i className="fab fa-opencart"></i> Off 10%! Shop Now Man
                                </li>
                                <li>
                                    <i className="fab fa-opencart"></i> 50% - 80% off on Fashion
                                </li>
                                <li>
                                    <i className="fab fa-opencart"></i> 20% off Entire Purchase Promo code: offT20
                                </li>
                                <li>
                                    <i className="fab fa-opencart"></i> Off 50%! Shop Now
                                </li>
                            </ul>
                        </div>
                    </div> */}
						</div>
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
									<li>
										<a href='/'>My Account</a>
									</li>
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
								<li className='side-menu'>
									<a href='/'>
										<i className='fa fa-shopping-bag'></i>
										<span className='badge'>3</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className='side'>
						<a href='/' className='close-side'>
							<i className='fa fa-times'></i>
						</a>
						<li className='cart-box'>
							<ul className='cart-list'>
								<li>
									<a href='/' className='photo'>
										<img src={itemOne} className='cart-thumb' alt='' />
									</a>
									<h6>
										<a href='/'>Delica omtantur </a>
									</h6>
									<p>
										1x - <span className='price'>$80.00</span>
									</p>
								</li>
								<li>
									<a href='/' className='photo'>
										<img src={itemTwo} className='cart-thumb' alt='' />
									</a>
									<h6>
										<a href='/'>Omnes ocurreret</a>
									</h6>
									<p>
										1x - <span className='price'>$60.00</span>
									</p>
								</li>
								<li>
									<a href='/' className='photo'>
										<img src={itemThree} className='cart-thumb' alt='' />
									</a>
									<h6>
										<a href='/'>Agam facilisis</a>
									</h6>
									<p>
										1x - <span className='price'>$40.00</span>
									</p>
								</li>
								<li className='total'>
									<a
										onClick={e => {
											e.preventDefault();
											history.push('/cart');
										}}
										href='/cart'
										className='btn btn-default hvr-hover btn-cart'
									>
										VIEW CART
									</a>
									<span className='float-right'>
										<strong>Total</strong>: $180.00
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
