import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import API from 'api';

export const getByUser = createAsyncThunk(
	'cart/getByUser',
	// ({ onComplete }) => {
	// 	return API.cart
	// 		.getByUser()
	// 		.then(({ data }) => {
	// 			onComplete(null, data);
	// 			return data;
	// 		})
	// 		.catch(error => {
	// 			onComplete(error.response.data, null);
	// 			throw new Error(error.response.data);
	// 		});
	// }
	async () => {
		const response = await API.cart.getByUser();
		return response.data.cart;
	}
);

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		cart: {},
		loading: false,
		error: ''
	},
	reducers: {},
	extraReducers: {
		[getByUser.pending](state) {
			state.loading = true;
		},
		[getByUser.rejected](state, action) {
			state.loading = false;
			state.error = action.error;
		},
		[getByUser.fulfilled](state, action) {
			state.loading = false;
			state.cart = action.payload;
		}
	}
});

export const actions = {
	getByUser
};

export default cartSlice.reducer;
