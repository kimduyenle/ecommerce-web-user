import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import calTotal from 'utils/calTotal';
import useNotification from 'utils/hooks/notification';
import cartDetailAPI from 'api/cartDetail';
import { useDispatch } from 'react-redux';
import { getByUser } from 'features/cartSlice';

const Cart = ({ cartDetails = [], fetchCart }) => {
	const history = useHistory();
	const { showError, showSuccess } = useNotification();
	const dispatch = useDispatch();
	const [updatedQuantity, setUpdatedQuantity] = useState(0);

	return (
		<div className='cart-box-main'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='table-main table-responsive'>
							<table className='table'>
								<thead>
									<tr>
										<th>Images</th>
										<th>Product Name</th>
										<th>Price</th>
										<th>Quantity</th>
										<th>Total</th>
										<th>Remove</th>
									</tr>
								</thead>
								<tbody>
									{cartDetails.length > 0 &&
										cartDetails.map((detail, index) => (
											<tr key={index}>
												<td className='thumbnail-img'>
													<a href='/'>
														<img
															className='img-fluid'
															src={detail.product.images[0].path}
															alt=''
														/>
													</a>
												</td>
												<td className='name-pr'>
													<a href='/'>{detail.product.name}</a>
												</td>
												<td className='price-pr'>
													<p>{detail.price}</p>
												</td>
												<td className='quantity-box'>
													<input
														type='number'
														size='4'
														value={detail.quantity}
														min='1'
														step='1'
														className='c-input-text qty text'
														onChange={async e => {
															try {
																const response = await cartDetailAPI.editQuantity(
																	{
																		productId: detail.productId,
																		cartId: detail.cartId,
																		quantity: e.target.value
																	}
																);
																await fetchCart();
															} catch (error) {
																showError('Failed to edit');
															}
														}}
													/>
												</td>
												<td className='total-pr'>
													<p>{detail.price * detail.quantity}</p>
												</td>
												<td className='remove-pr'>
													<button
														className='btn btn-remove'
														onClick={async () => {
															try {
																const response = await cartDetailAPI.delete({
																	productId: detail.productId,
																	cartId: detail.cartId
																});
																await fetchCart();
																showSuccess('Deleted successfully.');
															} catch (error) {
																showError('Failed to delete');
															}
														}}
													>
														<i className='fas fa-times'></i>
													</button>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				<div className='row my-5'>
					<div className='col-lg-6 col-sm-6'>
						<div className='coupon-box'>
							<div className='input-group input-group-sm'>
								<input
									className='form-control'
									placeholder='Enter your coupon code'
									aria-label='Coupon code'
									type='text'
								/>
								<div className='input-group-append'>
									<button className='btn btn-theme' type='button'>
										Apply Coupon
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className='col-lg-6 col-sm-6'>
						<div className='update-box'>
							<input value='Update Cart' type='submit' />
						</div>
					</div>
				</div>

				<div className='row my-5'>
					<div className='col-lg-8 col-sm-12'></div>
					<div className='col-lg-4 col-sm-12'>
						<div className='order-box'>
							<h3>Order summary</h3>
							<div className='d-flex'>
								<h4>Sub Total</h4>
								<div className='ml-auto font-weight-bold'>
									{calTotal(cartDetails)}
								</div>
							</div>
							<div className='d-flex'>
								<h4>Discount</h4>
								<div className='ml-auto font-weight-bold'> $ 40 </div>
							</div>
							<hr className='my-1' />
							<div className='d-flex'>
								<h4>Coupon Discount</h4>
								<div className='ml-auto font-weight-bold'> $ 10 </div>
							</div>
							<div className='d-flex'>
								<h4>Tax</h4>
								<div className='ml-auto font-weight-bold'> $ 2 </div>
							</div>
							<div className='d-flex'>
								<h4>Shipping Cost</h4>
								<div className='ml-auto font-weight-bold'> Free </div>
							</div>
							<hr />
							<div className='d-flex gr-total'>
								<h5>Grand Total</h5>
								<div className='ml-auto h5'>{calTotal(cartDetails)}</div>
							</div>
							<hr />{' '}
						</div>
					</div>
					<div className='col-12 d-flex shopping-box'>
						<a
							onClick={e => {
								e.preventDefault();
								history.push('/checkout');
							}}
							href='checkout'
							className='ml-auto btn hvr-hover'
						>
							Checkout
						</a>{' '}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
