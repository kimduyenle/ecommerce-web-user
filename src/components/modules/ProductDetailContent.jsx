import TitleBox from 'components/titleBox';
import ProductDetail from 'components/productDetail';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';
import productAPI from 'api/product';

const ProductDetailContent = () => {
	const { search } = useLocation();
	const { id } = qs.parse(search.replace(/^\?/, ''));
	const [product, setProduct] = useState({
		name: '',
		price: 0,
		description: '',
		images: [],
		quantity: 0,
		sold: 0
	});

	useEffect(() => {
		fetchProduct(id);
	}, []);

	const fetchProduct = async id => {
		try {
			// const params = {
			//   _page: 1,
			//   _limit: 10,
			// };
			const response = await productAPI.get(id);
			const fetchedProduct = response.data.product;
			setProduct({
				name: fetchedProduct.name,
				price: fetchedProduct.price,
				description: fetchedProduct.description,
				images: fetchedProduct.images,
				quantity: fetchedProduct.quantity,
				sold: fetchedProduct.orderDetails.length
			});
		} catch (error) {
			console.log('Failed to fetch product: ', error);
		}
	};
	return (
		<div>
			<TitleBox parent='Home' children='Product Detail' path='/' />
			<ProductDetail {...product} />
		</div>
	);
};

export default ProductDetailContent;
