import authAPI from './auth';
import categoryAPI from './category';
import userAPI from './user';
import cartAPI from './cart';
import provinceAPI from './province';

const API = {
	auth: authAPI,
	user: userAPI,
	category: categoryAPI,
	cart: cartAPI,
	province: provinceAPI
};

export default API;
