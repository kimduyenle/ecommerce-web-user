import TitleBox from 'components/titleBox';
import Checkout from 'components/checkout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getByUser } from 'features/cartSlice';
import transportationAPI from 'api/transportation';

const CheckoutContent = () => {
	const { cart } = useSelector(state => state.cart);
	const dispatch = useDispatch();
	const fetchCart = () => {
		dispatch(getByUser());
	};

	const [trans, setTrans] = useState([]);

	useEffect(() => {
		async function fetchTrans() {
			try {
				const res = await transportationAPI.getAll();
				setTrans(res.data.trans);
			} catch (error) {
				console.log('Failed to fetch trans: ', error);
			}
		}
		fetchTrans();
	}, []);
	return (
		<div>
			<TitleBox parent='Trang chủ' children='Đặt hàng' path='/' />
			<Checkout cartDetails={cart.cartDetails} trans={trans} />
		</div>
	);
};

export default CheckoutContent;
