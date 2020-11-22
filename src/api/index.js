import authAPI from './auth';
import categoryAPI from './category';
import userAPI from './user';
import cartAPI from './cart';

const API = {
	auth: authAPI,
	user: userAPI,
	category: categoryAPI,
	cart: cartAPI
};

export default API;
