import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import NumberInput from 'components/inputs/NumberInput';

const ProductDetail = ({
	name,
	price,
	description,
	images,
	quantity,
	sold
}) => {
	return (
		<div className='shop-detail-box-main'>
			<div className='container'>
				<div className='row'>
					<div className='col-xl-5 col-lg-5 col-md-6'>
						<div
							id='carousel-example-1'
							className='single-product-slider carousel slide'
							data-ride='carousel'
						>
							<div className='carousel-inner' role='listbox'>
								<div className='carousel-item active'>
									{' '}
									<img
										className='d-block w-100'
										src={
											images.length > 0
												? images[0].path
												: 'https://picsum.photos/400'
										}
										alt='Slide 1'
									/>{' '}
								</div>
								{images.slice(1).map((image, index) => (
									<div className='carousel-item' key={index}>
										{' '}
										<img
											className='d-block w-100'
											src={image.path}
											alt={`Slide ${index + 2}`}
										/>{' '}
									</div>
								))}

								{/* <div className='carousel-item'>
									{' '}
									<img
										className='d-block w-100'
										src={pro3}
										alt='Third slide'
									/>{' '}
								</div> */}
							</div>
							<a
								className='carousel-control-prev'
								href='#carousel-example-1'
								role='button'
								data-slide='prev'
							>
								<i className='fa fa-angle-left' aria-hidden='true'></i>
								<span className='sr-only'>Previous</span>
							</a>
							<a
								className='carousel-control-next'
								href='#carousel-example-1'
								role='button'
								data-slide='next'
							>
								<i className='fa fa-angle-right' aria-hidden='true'></i>
								<span className='sr-only'>Next</span>
							</a>
							<ol className='carousel-indicators'>
								<li
									data-target='#carousel-example-1'
									data-slide-to='0'
									className='active'
								>
									<img
										className='d-block w-100 img-fluid'
										src={
											images.length > 0
												? images[0].path
												: 'https://picsum.photos/400'
										}
										alt=''
									/>
								</li>
								{images.slice(1).map((image, index) => (
									<li
										data-target='#carousel-example-1'
										data-slide-to={index + 1}
										key={index}
									>
										<img
											className='d-block w-100 img-fluid'
											src={image.path}
											alt=''
										/>
									</li>
								))}
								{/* <li data-target='#carousel-example-1' data-slide-to='1'>
									<img className='d-block w-100 img-fluid' src={view2} alt='' />
								</li>
								<li data-target='#carousel-example-1' data-slide-to='2'>
									<img className='d-block w-100 img-fluid' src={view3} alt='' />
								</li> */}
							</ol>
						</div>
					</div>
					<div className='col-xl-7 col-lg-7 col-md-6'>
						<div className='single-product-details'>
							<Formik
								enableReinitialize={true}
								initialValues={{
									quantity: 1
								}}
								validationSchema={Yup.object().shape({
									quantity: Yup.number().required('Quantity is required')
								})}
								onSubmit={({ quantity }, { setSubmitting }) => {
									// dispatch(
									// 	signin({
									// 		username,
									// 		password,
									// 		onComplete: (error, data) => {
									// 			setSubmitting(false);
									// 			if (!error) {
									// 				// handle login success
									// 				history.push(routes['dashboard'].path);
									// 				return;
									// 			}
									// 			const errorMessages = Object.values(error).join('. ');
									// 			return showError(errorMessages);
									// 		}
									// 	})
									// );
									console.log(quantity);
								}}
							>
								{({ isSubmitting }) => (
									<Form>
										<h2>{name}</h2>
										<h5>
											{' '}
											<del>$ 60.00</del> {price}
										</h5>
										<p className='available-stock'>
											<span>
												{' '}
												More than {quantity} available /{' '}
												<a href='/'>{sold} sold </a>
											</span>
										</p>
										<h4>Description:</h4>
										<p>{description}</p>
										<ul>
											{/* <li>
                                        <div className="form-group size-st">
                                            <label className="size-label">Size</label>
                                            <select id="basic" className="selectpicker show-tick form-control">
									<option value="0">Size</option>
									<option value="0">S</option>
									<option value="1">M</option>
									<option value="1">L</option>
									<option value="1">XL</option>
									<option value="1">XXL</option>
									<option value="1">3XL</option>
									<option value="1">4XL</option>
								</select>
                                        </div>
                                    </li> */}
											<li>
												<div className='form-group quantity-box'>
													<label className='control-label'>Quantity</label>
													{/* <input
														class='form-control'
														value='0'
														min='0'
														max='20'
														type='number'
													/> */}
													<Field
														// label="Username"
														className='form-control'
														min='1'
														// value='1'
														// margin='normal'
														name='quantity'
														component={NumberInput}
														// fullWidth
														// variant='outlined'
													/>
												</div>
											</li>
										</ul>

										<div className='price-box-bar'>
											<div className='cart-and-bay-btn'>
												<a
													className='btn hvr-hover'
													data-fancybox-close=''
													href='/'
												>
													Buy New
												</a>
												<button
													className='btn hvr-hover'
													// data-fancybox-close=''
													// href='/'
													type='submit'
												>
													Add to cart
												</button>
											</div>
										</div>

										<div className='add-to-btn'>
											<div className='add-comp'>
												<a className='btn hvr-hover' href='/'>
													<i className='fas fa-heart'></i> Add to wishlist
												</a>
												<a className='btn hvr-hover' href='/'>
													<i className='fas fa-sync-alt'></i> Add to Compare
												</a>
											</div>
											<div className='share-bar'>
												<a className='btn hvr-hover' href='/'>
													<i className='fab fa-facebook' aria-hidden='true'></i>
												</a>
												<a className='btn hvr-hover' href='/'>
													<i
														className='fab fa-google-plus'
														aria-hidden='true'
													></i>
												</a>
												<a className='btn hvr-hover' href='/'>
													<i className='fab fa-twitter' aria-hidden='true'></i>
												</a>
												<a className='btn hvr-hover' href='/'>
													<i
														className='fab fa-pinterest-p'
														aria-hidden='true'
													></i>
												</a>
												<a className='btn hvr-hover' href='/'>
													<i className='fab fa-whatsapp' aria-hidden='true'></i>
												</a>
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</div>
				</div>

				{/* <div className="row my-5">
                <div className="col-lg-12">
                    <div className="title-all text-center">
                        <h1>Featured Products</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet lacus enim.</p>
                    </div>
                    <div className="featured-products-box owl-carousel owl-theme">
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/img-pro-01.jpg" className="img-fluid" alt="Image">
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="/">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                    <h5> $9.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/img-pro-02.jpg" className="img-fluid" alt="Image">
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="/">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                    <h5> $9.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/img-pro-03.jpg" className="img-fluid" alt="Image">
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="/">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                    <h5> $9.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/img-pro-04.jpg" className="img-fluid" alt="Image">
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="/">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                    <h5> $9.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/img-pro-01.jpg" className="img-fluid" alt="Image">
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="/">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                    <h5> $9.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/img-pro-02.jpg" className="img-fluid" alt="Image">
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="/">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                    <h5> $9.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/img-pro-03.jpg" className="img-fluid" alt="Image">
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="/">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                    <h5> $9.79</h5>
                                </div>
                            </div>
                        </div>
                        <div className="item">
                            <div className="products-single fix">
                                <div className="box-img-hover">
                                    <img src="images/img-pro-04.jpg" className="img-fluid" alt="Image">
                                    <div className="mask-icon">
                                        <ul>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="View"><i className="fas fa-eye"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Compare"><i className="fas fa-sync-alt"></i></a></li>
                                            <li><a href="/" data-toggle="tooltip" data-placement="right" title="Add to Wishlist"><i className="far fa-heart"></i></a></li>
                                        </ul>
                                        <a className="cart" href="/">Add to Cart</a>
                                    </div>
                                </div>
                                <div className="why-text">
                                    <h4>Lorem ipsum dolor sit amet</h4>
                                    <h5> $9.79</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
			</div>
		</div>
	);
};

export default ProductDetail;
