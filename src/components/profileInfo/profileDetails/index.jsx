import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	makeStyles
} from '@material-ui/core';
import TextInput from 'components/inputs/TextInput';
import userAPI from 'api/user';
import useNotification from 'utils/hooks/notification';

const useStyles = makeStyles(() => ({
	root: {},
	button: {
		backgroundColor: '#122230',
		'&:hover': {
			backgroundColor: '#122230ed'
		}
	}
}));

const ProfileDetails = ({ className, user, fetchUser, ...rest }) => {
	const classes = useStyles();
	const { showSuccess, showError } = useNotification();

	return (
		<>
			<Formik
				enableReinitialize={true}
				initialValues={{
					username: user.username,
					email: user.email,
					phoneNumber: user.phoneNumber,
					address: user.address
				}}
				validationSchema={Yup.object().shape({
					username: Yup.string().max(255).required('Username is required'),
					email: Yup.string().email().required('Email is required')
				})}
				onSubmit={async ({ username, email, phoneNumber, address }) => {
					try {
						const response = await userAPI.edit(
							{ username, email, phoneNumber, address },
							user.id
						);
						// onFileUpload();
						await fetchUser();
						showSuccess('Editted successfully.');
					} catch (error) {
						showError('Failed to edit user.');
					}
				}}
			>
				{({ isSubmitting, values }) => (
					<Form>
						<Card>
							<CardContent>
								<Grid container spacing={3}>
									<Grid item md={6} xs={12}>
										<Field
											label='Tên tài khoản'
											margin='normal'
											name='username'
											component={TextInput}
											fullWidth
											variant='outlined'
											size='small'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<Field
											label='Email'
											margin='normal'
											name='email'
											component={TextInput}
											fullWidth
											variant='outlined'
											size='small'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<Field
											label='Số điện thoại'
											margin='normal'
											name='phoneNumber'
											component={TextInput}
											fullWidth
											variant='outlined'
											size='small'
										/>
									</Grid>
									<Grid item md={6} xs={12}>
										<Field
											label='Địa chỉ'
											margin='normal'
											name='address'
											component={TextInput}
											fullWidth
											variant='outlined'
											size='small'
										/>
									</Grid>
								</Grid>
							</CardContent>
							<Divider />
							<Box display='flex' justifyContent='flex-end' p={2}>
								<Button
									color='primary'
									variant='contained'
									type='submit'
									className={classes.button}
								>
									Lưu thông tin
								</Button>
							</Box>
						</Card>
					</Form>
				)}
			</Formik>
		</>
	);
};

ProfileDetails.propTypes = {
	className: PropTypes.string
};

export default ProfileDetails;
