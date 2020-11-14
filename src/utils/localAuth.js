import Cookies from 'js-cookie';
import JwtDecode from 'jwt-decode';

export const localAuthenticate = () => {
	const token = Cookies.get('token');
	try {
		const tokenInfo = JwtDecode(token);
		return {
			isAuthenticated: true,
			tokenInfo
		};
	} catch (error) {
		return {
			isAuthenticated: false,
			tokenInfo: null
		};
	}
};

export const setAccessToken = token => Cookies.set('token', token);

export const getAccessToken = () => {
	const token = Cookies.get('token');
	return token && `Bearer ${Cookies.get('token')}`;
};

export const removeAccessToken = () => {
	return Cookies.remove('token');
};
