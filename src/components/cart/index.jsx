import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import calTotal from "utils/calTotal";
import useNotification from "utils/hooks/notification";
import { useDispatch } from "react-redux";
import _ from "lodash";
import "antd/dist/antd.css";
import { Checkbox, Modal } from "antd";
import { deleteCartDetail, editCartDetail } from "features/cartSlice";

const error = (title, content, ok, onOk) => {
	Modal.error({
		title: title,
		content: content,
		okText: ok,
		onOk: onOk
	});
};

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Apple", "Pear", "Orange"];

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
		console.log("hiiii: ", detail.product.user.username);
		if (_.indexOf(users, detail.product.user.username) === -1) {
			users.push(detail.product.user.username);
		}
		console.log("ss: ", users);
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

	console.log("users", cartDetails);
	console.log("cartDetailsByOwner: ", cartDetailsByOwner);

	return (
		<div className="cart-box-main">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="table-main table-responsive">
							<table className="table">
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
																		console.log("check: ", check);
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
															<td className="thumbnail-img">
																<span>
																	<img
																		className="img-fluid"
																		src={detail.product.images[0]?.path}
																		alt=""
																	/>
																</span>
															</td>
															<td className="name-pr">
																<span
																	onClick={() =>
																		history.push({
																			pathname: "/product-detail",
																			search: `?id=${detail.productId}`
																		})
																	}
																>
																	{detail.product.name}
																</span>
															</td>
															<td className="price-pr">
																<p>${detail.price}</p>
															</td>
															<td className="quantity-box">
																<input
																	type="number"
																	size="4"
																	value={detail.quantity}
																	min="1"
																	max={detail.product.quantity}
																	step="1"
																	className="c-input-text qty text"
																	onKeyDown={e => {
																		if (
																			e.key === "." ||
																			e.key === "-" ||
																			e.key === "+"
																		) {
																			e.preventDefault();
																		}
																	}}
																	onBlur={e => {
																		const value = parseInt(e.target.value);
																		if (!value && value !== 0) {
																			error(
																				"Lỗi",
																				"Vui lòng nhập số lượng",
																				"Đồng ý",
																				() => {
																					dispatch(
																						editCartDetail({
																							productId: detail.productId,
																							cartId: detail.cartId,
																							quantity: 1
																						})
																					);
																				}
																			);
																		}
																		if (value < 1) {
																			error(
																				"Lỗi",
																				"Bạn phải chọn tối thiểu 1 sản phẩm",
																				"Đồng ý",
																				() => {
																					dispatch(
																						editCartDetail({
																							productId: detail.productId,
																							cartId: detail.cartId,
																							quantity: 1
																						})
																					);
																				}
																			);
																		}
																		if (value > detail.product.quantity) {
																			error(
																				"Lỗi",
																				`Bạn chỉ có thể mua tối đa ${detail.product.quantity} sản phẩm`,
																				"Đồng ý",
																				() => {
																					dispatch(
																						editCartDetail({
																							productId: detail.productId,
																							cartId: detail.cartId,
																							quantity: detail.product.quantity
																						})
																					);
																				}
																			);
																		}
																	}}
																	onChange={async e => {
																		// try {
																		// 	const response = await cartDetailAPI.editQuantity(
																		// 		{
																		// 			productId: detail.productId,
																		// 			cartId: detail.cartId,
																		// 			quantity: e.target.value
																		// 		}
																		// 	);
																		// 	await fetchCart();
																		// } catch (error) {
																		// 	showError("Failed to edit");
																		// }
																		const value = parseInt(e.target.value);
																		dispatch(
																			editCartDetail({
																				productId: detail.productId,
																				cartId: detail.cartId,
																				quantity: value
																			})
																		);
																	}}
																/>
															</td>
															<td className="total-pr">
																<p>${detail.price * detail.quantity}</p>
															</td>
															<td className="remove-pr">
																<button
																	className="btn btn-remove"
																	// onClick={async () => {
																	// 	try {
																	// 		const response = await cartDetailAPI.delete(
																	// 			{
																	// 				productId: detail.productId,
																	// 				cartId: detail.cartId
																	// 			}
																	// 		);
																	// 		await fetchCart();
																	// 		showSuccess("Xóa sản phẩm khỏi giỏ hàng");
																	// 	} catch (error) {
																	// 		showError("Failed to delete");
																	// 	}
																	// }}
																	onClick={() => {
																		dispatch(
																			deleteCartDetail({
																				productId: detail.productId,
																				cartId: detail.cartId
																			})
																		);
																		showSuccess("Xóa sản phẩm khỏi giỏ hàng");
																	}}
																>
																	<i className="fas fa-times"></i>
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

				<div className="row my-5">
					<div className="col-lg-8 col-sm-12"></div>
					<div className="col-lg-4 col-sm-12">
						<div className="order-box">
							<hr />
							<div className="d-flex gr-total">
								<h5>Tổng tiền</h5>
								<div className="ml-auto h5">${calTotal(cartDetails)}</div>
							</div>
							<hr />{" "}
						</div>
					</div>
					<div className="col-12 d-flex shopping-box">
						<a
							onClick={e => {
								e.preventDefault();
								history.push("/checkout");
							}}
							href="/checkout"
							className="ml-auto btn hvr-hover"
						>
							Mua hàng
						</a>{" "}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
