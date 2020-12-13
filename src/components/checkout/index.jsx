import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import TextInput from "components/inputs/TextInput";
import RadioGroupInput from "components/inputs/RadioGroupInput";
import calTotal from "utils/calTotal";
import orderAPI from "api/order";
import orderDetailAPI from "api/orderDetail";
import useNotification from "utils/hooks/notification";
import { provinceData, districtData } from "utils/province";
import cartDetailAPI from "api/cartDetail";

import "antd/dist/antd.css";
import { Select } from "antd";
const { Option } = Select;

const Checkout = ({ cartDetails = [], trans = [] }) => {
	const { user } = useSelector(state => state.user);

	const history = useHistory();
	const { showSuccess, showError } = useNotification();

	const [transId, setTransId] = useState(1);
	const [province, setProvince] = useState(provinceData[0]);
	const [cities, setCities] = React.useState(districtData[provinceData[0]]);
	const [secondCity, setSecondCity] = React.useState(
		districtData[provinceData[0]][0]
	);

	const handleProvinceChange = value => {
		setProvince(value);
		setCities(districtData[value]);
		setSecondCity(districtData[value][0]);
	};

	const onSecondCityChange = value => {
		setSecondCity(value);
	};
	return (
		<div className="cart-box-main">
			<div className="container">
				<Formik
					enableReinitialize={true}
					initialValues={{
						paymentMethod: "Thanh toán khi nhận hàng",
						deliveryPhoneNumber: user.phoneNumber || "",
						deliveryAddress: user.address || "",
						province: province,
						district: secondCity,
						transId: transId
					}}
					validationSchema={Yup.object().shape({
						deliveryPhoneNumber: Yup.string()
							.max(255)
							.required("Số điện thoại là bắt buộc"),
						deliveryAddress: Yup.string()
							.max(255)
							.required("Địa chỉ chi tiết là bắt buộc")
					})}
					onSubmit={async (
						{
							paymentMethod,
							deliveryPhoneNumber,
							deliveryAddress,
							province,
							district,
							transId
						},
						{ setSubmitting }
					) => {
						try {
							let statusId;
							if (paymentMethod === "Thanh toán khi nhận hàng") {
								statusId = 1;
							} else {
								statusId = 7;
							}
							const response = await orderAPI.add({
								statusId: statusId,
								paymentMethod,
								deliveryPhoneNumber,
								deliveryAddress,
								province,
								district,
								transId
							});
							const orderId = await response.data.id;
							for (const detail of cartDetails) {
								const result = await orderDetailAPI.add({
									productId: detail.productId,
									orderId,
									quantity: detail.quantity,
									price: detail.price
								});
								await cartDetailAPI.delete({
									productId: detail.productId,
									cartId: detail.cartId
								});
							}
							if (paymentMethod === "Thanh toán khi nhận hàng") {
								history.push("/cart");
							} else {
								history.push({
									pathname: "/paypal",
									search: `id=${orderId}&total=${calTotal(cartDetails)}`
								});
							}
							showSuccess("Đặt hàng thành công");
						} catch (error) {
							showError("Đặt hàng không thành công");
						}
					}}
				>
					{({ isSubmitting, values }) => (
						<>
							<Form>
								<div className="row">
									<div className="col-sm-6 col-lg-6 mb-3">
										<div className="checkout-address">
											<div className="title-left">
												<h3>Địa chỉ nhận hàng</h3>
											</div>
											{/* <form className='needs-validation' noValidate> */}
											<div className="mb-3">
												<label htmlFor="username">Tên tài khoản *</label>
												<div className="input-group">
													<input
														type="text"
														className="form-control"
														id="username"
														readOnly
														value={user.username}
													/>
													{/* <div
															className='invalid-feedback'
															style={{ width: '100%' }}
														>
															{' '}
															Your username is required.{' '}
														</div> */}
												</div>
											</div>
											<div className="mb-3">
												<label htmlFor="email">Email *</label>
												<input
													type="email"
													className="form-control"
													id="email"
													readOnly
													value={user.email}
												/>
												{/* <div className='invalid-feedback'>
														{' '}
														Please enter a valid email address for shipping
														updates.{' '}
													</div> */}
											</div>
											<div className="mb-4">
												<label htmlFor="phone">Số điện thoại *</label>
												<Field
													name="deliveryPhoneNumber"
													type="text"
													className="form-control"
													id="phone"
													component={TextInput}
													variant="outlined"
													size="small"
												/>
												{/* <div className='invalid-feedback'>
													{' '}
													Please enter a valid email address for shipping
													updates.{' '}
												</div> */}
											</div>
											<div className="row">
												<div className="col-md-6 mb-3">
													<label htmlFor="country">Tỉnh | Thành phố *</label>
													{/* <select className='wide w-100' id='country'>
														<option value='Choose...' data-display='Select'>
															Choose...
														</option>
														<option value='United States'>United States</option>
													</select>
													<div className='invalid-feedback'>
														{' '}
														Please select a valid country.{' '}
													</div> */}
													<Select
														defaultValue={provinceData[0]}
														style={{ width: 120 }}
														onChange={handleProvinceChange}
													>
														{provinceData?.map(province => (
															<Option key={province}>{province}</Option>
														))}
													</Select>
												</div>
												<div className="col-md-6 mb-3">
													<label htmlFor="state">Quận | Huyện *</label>
													{/* <select className='wide w-100' id='state'>
														<option data-display='Select'>Choose...</option>
														<option>California</option>
													</select>
													<div className='invalid-feedback'>
														{' '}
														Please provide a valid state.{' '}
													</div> */}
													<Select
														style={{ width: 120 }}
														value={secondCity}
														onChange={onSecondCityChange}
													>
														{cities?.map(city => (
															<Option key={city}>{city}</Option>
														))}
													</Select>
												</div>
											</div>
											<div className="mb-4">
												<label htmlFor="address">Địa chỉ chi tiết *</label>
												<Field
													name="deliveryAddress"
													type="text"
													className="form-control"
													id="address"
													component={TextInput}
													variant="outlined"
													size="small"
												/>
												{/* <div className='invalid-feedback'>
													{' '}
													Please enter your shipping address.{' '}
												</div> */}
											</div>
											<hr className="mb-4" />
											<div className="custom-control custom-checkbox">
												<input
													type="checkbox"
													className="custom-control-input"
													id="save-info"
												/>
												<label
													className="custom-control-label"
													htmlFor="save-info"
												>
													Lưu thông tin địa chỉ cho lần sau
												</label>
											</div>
											<hr className="mb-4" />
											<Field
												name="paymentMethod"
												label="Phương thức thanh toán"
												options={[
													{
														key: "Thanh toán khi nhận hàng",
														label: "Thanh toán khi nhận hàng"
													},
													{
														key: "Paypal",
														label: "Paypal"
													}
												]}
												component={RadioGroupInput}
											/>
											{/* <div className='title'>
												{' '}
												<span>Phương thức thanh toán</span>{' '}
											</div>
											<div className='d-block my-3'>
												<div className='custom-control custom-radio'>
													<input
														id='on-delivery'
														name='paymentMethod'
														type='radio'
														className='custom-control-input'
														checked
														onChange={e => {
															console.log(e);
														}}
														required
													/>
													<label
														className='custom-control-label'
														htmlFor='on-delivery'
													>
														Thanh toán khi nhận hàng
													</label>
												</div>
												<div className='custom-control custom-radio'>
													<input
														id='paypal'
														name='paymentMethod'
														type='radio'
														className='custom-control-input'
														required
													/>
													<label
														className='custom-control-label'
														htmlFor='paypal'
													>
														Paypal
													</label>
												</div>
											</div> */}
											<hr className="mb-1" /> {/* </form> */}
										</div>
									</div>
									<div className="col-sm-6 col-lg-6 mb-3">
										<div className="row">
											<div className="col-md-12 col-lg-12">
												<div className="shipping-method-box">
													<div className="title-left">
														<h3>Phương thức vận chuyển</h3>
													</div>
													<div className="mb-4">
														<div className="custom-control custom-radio">
															<input
																id="shippingOption1"
																name="shipping-option"
																className="custom-control-input"
																checked="checked"
																type="radio"
																onChange={() => {
																	setTransId(1);
																}}
															/>
															<label
																className="custom-control-label"
																htmlFor="shippingOption1"
															>
																{trans[0]?.name}
															</label>{" "}
															<span className="float-right font-weight-bold">
																${trans[0]?.cost}
															</span>{" "}
														</div>
														<div className="ml-4 mb-2 small">(3-7 ngày)</div>
														<div className="custom-control custom-radio">
															<input
																id="shippingOption2"
																name="shipping-option"
																className="custom-control-input"
																type="radio"
																onChange={() => {
																	setTransId(2);
																}}
															/>
															<label
																className="custom-control-label"
																htmlFor="shippingOption2"
															>
																{trans[1]?.name}
															</label>{" "}
															<span className="float-right font-weight-bold">
																${trans[1]?.cost}
															</span>{" "}
														</div>
														<div className="ml-4 mb-2 small">(2-4 ngày)</div>
													</div>
												</div>
											</div>
											<div className="col-md-12 col-lg-12">
												<div className="odr-box">
													<div className="title-left">
														<h3>Giỏ hàng</h3>
													</div>
													<div className="rounded p-2 bg-light">
														{cartDetails.map((cartDetail, index) => (
															<div
																className="media mb-2 border-bottom"
																key={index}
															>
																<div className="media-body">
																	{" "}
																	<a href="detail.html">
																		{cartDetail.product.name}
																	</a>
																	<div className="small text-muted">
																		Giá: ${cartDetail.price}{" "}
																		<span className="mx-2">|</span> Số lượng:{" "}
																		{cartDetail.quantity}{" "}
																		<span className="mx-2">|</span> Tổng: $
																		{cartDetail.price * cartDetail.quantity}
																	</div>
																</div>
															</div>
														))}
													</div>
												</div>
											</div>
											<div className="col-md-12 col-lg-12">
												<div className="order-box">
													<div className="title-left">
														<h3>Đơn hàng</h3>
													</div>
													<div className="d-flex">
														<h4>Tổng tiền hàng</h4>
														<div className="ml-auto font-weight-bold">
															${calTotal(cartDetails)}
														</div>
													</div>
													<div className="d-flex">
														<h4>Phí vận chuyển</h4>
														<div className="ml-auto font-weight-bold">
															${trans[transId - 1]?.cost}
														</div>
													</div>
													<hr />
													<div className="d-flex gr-total">
														<h5>Tổng thanh toán</h5>
														<div className="ml-auto h5">
															{" "}
															$
															{calTotal(cartDetails) +
																trans[transId - 1]?.cost}{" "}
														</div>
													</div>
													<hr />{" "}
												</div>
											</div>
											<div className="col-12 d-flex shopping-box">
												{/* {values.paymentMethod === "Thanh toán khi nhận hàng" ? ( */}
												<button className="ml-auto btn hvr-hover" type="submit">
													Đặt hàng
												</button>
												{/* ) : (
													<a
														href="/paypal"
														className="ml-auto btn hvr-hover"
														onClick={e => {
															e.preventDefault();
															history.push("/paypal");
														}}
													>
														Thanh toán
													</a>
												)} */}
											</div>
										</div>
									</div>
								</div>
							</Form>
						</>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default Checkout;
