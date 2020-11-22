import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import TextInput from 'components/inputs/TextInput';
import { signup } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';
import useNotification from 'utils/hooks/notification';
import routes from 'app/routing/routes';

const RegisterForm = () => {
	const dispatch = useDispatch();
	const { showError, showSuccess } = useNotification();
	const history = useHistory();

	return (
		<Formik
			initialValues={{
				username: '',
				email: '',
				password: ''
			}}
			validationSchema={Yup.object().shape({
				username: Yup.string().max(255).required('Username is required'),
				email: Yup.string()
					.email('Must be a valid email')
					.max(255)
					.required('Email Address is required'),
				password: Yup.string().max(255).required('Password is required')
			})}
			onSubmit={({ username, email, password }, { setSubmitting }) => {
				console.log(username, email, password);
				dispatch(
					signup({
						username,
						email,
						password,
						onComplete: (error, data) => {
							setSubmitting(false);
							if (!error) {
								showSuccess('Registered successfully');
								history.push(routes['login'].path);
								return;
							}
							// const errorMessages = Object.values(error).join('. ');
							return showError(error);
						}
					})
				);
			}}
		>
			{({ isSubmitting }) => (
				<>
					<div className='title-left'>
						<h3>REGISTER</h3>
					</div>
					<Form>
						<div className='form-row'>
							<div className='form-group col-md-12'>
								<label htmlFor='InputUsername'>Username</label>
								<Field
									name='username'
									type='text'
									className='form-control'
									id='InputUsername'
									placeholder='Enter Username'
									component={TextInput}
									variant='outlined'
								/>
							</div>
							<div className='form-group col-md-12'>
								<label htmlFor='InputEmail'>Email Address</label>
								<Field
									name='email'
									type='text'
									className='form-control'
									id='InputEmail'
									placeholder='Enter Email'
									component={TextInput}
									variant='outlined'
								/>
							</div>
							<div className='form-group col-md-12'>
								<label htmlFor='InputPassword'>Password</label>
								<Field
									name='password'
									type='password'
									className='form-control'
									id='InputPassword'
									placeholder='Enter Password'
									component={TextInput}
									variant='outlined'
								/>
							</div>
						</div>
						<button type='submit' className='btn hvr-hover'>
							Register
						</button>
					</Form>
					<div className='action'>
						<label className='question'>Already have an account?</label>
						<button
							onClick={() => {
								history.push('/login');
							}}
							className='btn-login'
						>
							Login
						</button>
					</div>
				</>
			)}
		</Formik>
	);
};

export default RegisterForm;
