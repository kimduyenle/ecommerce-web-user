import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import {
	Box,
	Button,
	Container,
	Link,
	Typography,
	makeStyles
} from '@material-ui/core';
import Page from 'components/Page';
import TextInput from 'components/inputs/TextInput';
import SelectInput from 'components/inputs/SelectInput';
import { useDispatch } from 'react-redux';
import useNotification from 'utils/hooks/notification';
// import routes from 'app/app.routes';
import productAPI from 'api/product';
import categoryAPI from 'api/category';
import imageAPI from 'api/image';

const useStyles = makeStyles(theme => ({
	root: {
		backgroundColor: '#fff',
		height: '100%'
		// paddingBottom: theme.spacing(3),
		// paddingTop: theme.spacing(3)
	},
	container: {
		paddingLeft: 0,
		paddingRight: 0
	},
	title: {
		fontFamily: 'Quattrocento Sans',
		fontSize: 15,
		fontWeight: 400,
		color: '#666666',
		padding: 0
	},
	field: {
		'& label, & input, & textarea, & > div': {
			fontSize: 15,
			fontFamily: 'Quattrocento Sans'
		}
	},
	button: {
		backgroundColor: '#122230',
		'&:hover': {
			backgroundColor: '#122230ed'
		}
	}
}));

const AddProduct = ({ fetchProduct }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { showError, showSuccess } = useNotification();
	const history = useHistory();
	const [categories, setCategories] = useState([]);
	const [images, setImages] = useState(null);

	const onFileUpload = async id => {
		try {
			for (let i = 0; i < images.length; i++) {
				if (images[i] !== '') {
					let fileData = new FormData();
					fileData.set(
						'image',
						images[i],
						`${images[i].lastModified}-${images[i].name}`
					);
					await imageAPI.uploadProductImage(fileData, id);
				}
			}
		} catch (error) {
			console.log('Failed to edit user: ', error);
		}

		console.log(images);
	};

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await categoryAPI.getAll();
				setCategories(response.data.categories);
			} catch (error) {
				console.log('Failed to fetch category: ', error);
			}
		};
		fetchCategories();
	}, []);

	return (
		<Page className={classes.root} title='Add product'>
			<Box
				display='flex'
				flexDirection='column'
				// height="100%"
				justifyContent='center'
			>
				<Container maxWidth='sm' className={classes.container}>
					<Formik
						enableReinitialize={true}
						initialValues={{
							categoryId: '',
							name: '',
							description: '',
							quantity: '',
							price: ''
						}}
						validationSchema={Yup.object().shape({
							categoryId: Yup.number().required('Category is required'),
							name: Yup.string().required('Name is required'),
							quantity: Yup.number().required('Quantity is required'),
							price: Yup.number().required('Price is required')
						})}
						onSubmit={async (
							{ categoryId, name, description, quantity, price },
							{ setSubmitting }
						) => {
							try {
								const response = await productAPI.add({
									categoryId,
									name,
									description,
									quantity,
									price
								});
								await onFileUpload(response.data.id);
								await fetchProduct();
								showSuccess('Added successfully.');
								// history.push(routes.products.path);
							} catch (error) {
								console.log('Failed to add product: ', error);
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<Box>
									<Typography
										color='textPrimary'
										variant='h6'
										className={classes.title}
									>
										Thêm sản phẩm
									</Typography>
								</Box>
								<Field
									label='Name'
									margin='normal'
									name='name'
									component={TextInput}
									fullWidth
									variant='outlined'
									className={classes.field}
								/>
								<Field
									name='categoryId'
									options={categories.map(category => {
										return {
											key: category.id,
											label: category.name
										};
									})}
									component={SelectInput}
									fullWidth
									label='Category'
									className={classes.field}
									// variant="outlined"
								/>
								<Field
									label='Quantity'
									margin='normal'
									name='quantity'
									component={TextInput}
									fullWidth
									type='number'
									variant='outlined'
									className={classes.field}
								/>
								<Field
									label='Price'
									margin='normal'
									name='price'
									component={TextInput}
									fullWidth
									type='number'
									variant='outlined'
									className={classes.field}
								/>
								<Field
									label='Description'
									margin='normal'
									name='description'
									component={TextInput}
									fullWidth
									multiline
									rows={5}
									variant='outlined'
									className={classes.field}
								/>
								<input
									name='images'
									type='file'
									multiple
									onChange={e => {
										setImages(e.target.files);
									}}
								/>

								<Box my={2}>
									<Button
										color='primary'
										disabled={isSubmitting}
										fullWidth
										size='large'
										type='submit'
										variant='contained'
										className={classes.button}
									>
										Add
									</Button>
								</Box>
							</Form>
						)}
					</Formik>
				</Container>
			</Box>
		</Page>
	);
};

export default AddProduct;
