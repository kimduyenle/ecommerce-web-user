import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import calTotal from 'utils/calTotal';
import useNotification from 'utils/hooks/notification';
import cartDetailAPI from 'api/cartDetail';
import { useDispatch } from 'react-redux';
import { getByUser } from 'features/cartSlice';
import _ from 'lodash';
import 'antd/dist/antd.css';
import { Checkbox, Divider } from 'antd';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];

const Cart = ({ cartDetails = [], fetchCart }) => {
	const history = useHistory();
	const { showError, showSuccess } = useNotification();
	const dispatch = useDispatch();
	const [updatedQuantity, setUpdatedQuantity] = useState(0);

	const [check, setCheck] = useState([]);

	const [checkedList, setCheckedList] = React.useState([]);
	const [checkedAll, setCheckedAll] = React.useState(false);

	// const onChange = list => {
	// 	setCheckedList(list);
	// 	// setIndeterminate(!!list.length && list.length < plainOptions.length);
	// 	setCheckAll(list.length === plainOptions.length);
	// };

	// const onCheckAllChange = e => {
	// 	setCheckedList(e.target.checked ? plainOptions : []);
	// 	// setIndeterminate(false);
	// 	setCheckAll(e.target.checked);
	// };

	const users = [];
	for (let detail of cartDetails) {
		console.log('hiiii: ', detail.product.user.username);
		if (_.indexOf(users, detail.product.user.username) === -1) {
			users.push(detail.product.user.username);
		}
		console.log('ss: ', users);
	}
	const cartDetailsByOwner = users.map(user => {
		const data = [];
		for (let detail of cartDetails) {
			if (user === detail.product.user.username) {
				data.push(detail);
			}
		}
		return {
			user,
			data
		};
	});

	console.log('users', cartDetails);
	console.log('cartDetailsByOwner: ', cartDetailsByOwner);

	return (
		<div className='cart-box-main'>
			<div className='container'>
				<div className='row'>
					<div className='col-lg-12'>
						<div className='table-main table-responsive'>
							<table className='table'>
								<thead>
									<tr>
										<th></th>
										<th>Hình ảnh</th>
										<th>Tên sản phẩm</th>
										<th>Giá</th>
										<th>Số lượng</th>
										<th>Tổng</th>
										<th>Xóa</th>
									</tr>
								</thead>
								<tbody>
									{cartDetailsByOwner.length > 0 &&
										cartDetailsByOwner.map((detailObj, index) => {
											const checkAll = [];
											for (let data of detailObj.data) {
												checkAll.push(data.productId);
											}
											return (
												<>
													<tr>
														<td>
															<Checkbox
																onChange={e => {
																	const checked = [];
																	if (e.target.checked) {
																		for (let data of detailObj.data) {
																			checked.push(data.productId);
																		}
																		setCheckedAll(true);
																	} else {
																		setCheckedAll(false);
																	}
																	setCheck(checked);
																}}
																checked={
																	JSON.stringify(check) ==
																	JSON.stringify(checkAll)
																}
															>
																{detailObj.user}
															</Checkbox>
														</td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
														<td></td>
													</tr>
													{detailObj.data.map((detail, index) => (
														<tr key={index}>
															<td>
																<Checkbox
																	checked={
																		_.indexOf(check, detail.productId) !== -1
																			? true
																			: false
																	}
																	onChange={e => {
																		console.log('check: ', check);
																		const currentCheck = check.filter(
																			x => true
																		);
																		if (e.target.checked) {
																			currentCheck.push(detail.productId);
																			setCheck(currentCheck);
																		} else {
																			const i = _.indexOf(
																				check,
																				detail.productId
																			);
																			currentCheck.splice(i, 1);
																			setCheck(currentCheck);
																		}
																	}}
																	disabled={
																		checkedAll &&
																		check.length > 0 &&
																		_.indexOf(check, detail.productId)
																	}
																></Checkbox>
															</td>
															<td className='thumbnail-img'>
																<a href='/'>
																	<img
																		className='img-fluid'
																		src={detail.product.images[0]?.path}
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
																	max={detail.product.quantity}
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
																			const response = await cartDetailAPI.delete(
																				{
																					productId: detail.productId,
																					cartId: detail.cartId
																				}
																			);
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
												</>
											);
										})}
								</tbody>
							</table>
						</div>
					</div>
				</div>

				{/* <div className='row my-5'>
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
				</div> */}

				<div className='row my-5'>
					<div className='col-lg-8 col-sm-12'></div>
					<div className='col-lg-4 col-sm-12'>
						<div className='order-box'>
							<hr />
							<div className='d-flex gr-total'>
								<h5>Tổng tiền</h5>
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
							href='/checkout'
							className='ml-auto btn hvr-hover'
						>
							Mua hàng
						</a>{' '}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
