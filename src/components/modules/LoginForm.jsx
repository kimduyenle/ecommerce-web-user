import React from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import TextInput from 'components/inputs/TextInput';
import { signin } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';
import useNotification from 'utils/hooks/notification';
import routes from 'app/routing/routes';

const LoginForm = () => {
	const dispatch = useDispatch();
	const { showError } = useNotification();
	const history = useHistory();

	return (
		<Formik
			initialValues={{
				username: '',
				password: ''
			}}
			validationSchema={Yup.object().shape({
				username: Yup.string().max(255).required('Username is required'),
				password: Yup.string().max(255).required('Password is required')
			})}
			onSubmit={({ username, password }, { setSubmitting }) => {
				dispatch(
					signin({
						username,
						password,
						onComplete: (error, data) => {
							setSubmitting(false);
							if (!error) {
								// handle login success
								history.push(routes['home'].path);
								return;
							}
							const errorMessages = Object.values(error).join('. ');
							return showError(errorMessages);
						}
					})
				);
			}}
		>
			{({ isSubmitting }) => (
				<>
					<div className='title-left'>
						<h3>LOGIN</h3>
					</div>
					<Form>
						<div className='form-row'>
							<div className='form-group col-md-12'>
								<label htmlFor='InputEmail'>Username</label>
								<Field
									name='username'
									type='text'
									className='form-control'
									id='InputEmail'
									placeholder='Enter Username'
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
							Login
						</button>
					</Form>
					<div className='action'>
						<label className='question'>Do not have an account?</label>
						<button
							onClick={() => {
								history.push('/register');
							}}
							className='btn-register'
						>
							Register
						</button>
					</div>
				</>
			)}
		</Formik>
	);
};

export default LoginForm;
