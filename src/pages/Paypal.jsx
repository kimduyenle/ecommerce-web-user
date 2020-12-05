import React, { Component } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import TitleBox from 'components/titleBox';

export default class Example extends Component {
	render() {
		return (
			<>
				<TitleBox parent='Trang chủ' children='Thanh toán' path='/' />
				<div className='paypal'>
					<PayPalButton
						amount='1000'
						// shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
						onSuccess={(details, data) => {
							// alert('Transaction completed by ' + details.payer.name.given_name);

							// // OPTIONAL: Call your server to save the transaction
							// return fetch('/paypal-transaction-complete', {
							// 	method: 'post',
							// 	body: JSON.stringify({
							// 		orderId: data.orderID
							// 	})
							// });
							console.log(details, data);
						}}
						currency='USD'
						options={{
							clientId:
								'AahRbFwBxZbe_2LApCXd-8j3eyIuwbBEqM0qU6Jdmey7HPU_RHxCkCl_1MDZCxQVZAJgJPr9rsmseJs7'
						}}
					/>
				</div>
			</>
		);
	}
}
