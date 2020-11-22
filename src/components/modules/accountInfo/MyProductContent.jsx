import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import TitleBox from 'components/titleBox';
import MyProduct from 'components/myProduct';
import AddProduct from 'components/myProduct/addProduct';
import { localAuthenticate } from 'utils/localAuth';
import useNotification from 'utils/hooks/notification';
import clsx from 'clsx';
import productAPI from 'api/product';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#fff',
		minHeight: '100%',
		paddingBottom: theme.spacing(9),
		paddingTop: theme.spacing(9)
	}
}));

const MyProductContent = () => {
	const classes = useStyles();
	const [products, setProducts] = useState([]);
	const { isAuthenticated, tokenInfo } = localAuthenticate();
	const { showSuccess, showError } = useNotification();

	const fetchProduct = async () => {
		try {
			// const params = {
			//   _page: 1,
			//   _limit: 10,
			// };
			const response = await productAPI.getByUser();
			setProducts(response.data.products);
		} catch (error) {
			console.log('Failed to fetch products: ', error);
		}
	};

	useEffect(() => {
		fetchProduct();
	}, []);

	const handleDeleteProduct = async id => {
		try {
			const response = await productAPI.delete(id);
			const newProducts = products.filter(
				product => product.id !== response.data.id
			);
			setProducts(newProducts);
			showSuccess('Deleted successfully.');
		} catch (error) {
			showError('Failed to delete');
		}
	};

	return (
		<>
			<TitleBox parent='Home' children='My Product' path='/' />
			<div className={clsx('container', classes.root)}>
				<div className='row special-list'>
					<div className='col-lg-6 col-md-12'>
						{products.length > 0
							? products.map((product, index) => (
									<MyProduct
										key={index}
										product={{ ...product }}
										handleDeleteProduct={handleDeleteProduct}
									/>
							  ))
							: 'Chưa có sản phẩm nào'}
					</div>
					<div className='col-lg-6 col-md-12'>
						<AddProduct fetchProduct={fetchProduct} />
					</div>
				</div>
			</div>
		</>
	);
};

export default MyProductContent;
