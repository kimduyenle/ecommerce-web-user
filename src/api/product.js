import apiClient from './apiClient';

const productAPI = {
  getAll: () => {
    const url = '/products';
    return apiClient.get(url);
  },
  get: id => {
    const url = `/products/${id}`;
    return apiClient.get(url);
  },
  add: ({categoryId, name, description, quantity, price}) => {
    const url = `/products`;
    return apiClient.post(url, {
      categoryId,
			name,
			description,
			quantity,
			price
    });
  },
  edit: ({categoryId, name, description, quantity, price}, id) => {
    const url = `/products/${id}`;
    return apiClient.put(url, {
      categoryId,
			name,
			description,
			quantity,
			price
    });
  },
  delete: id => {
    const url = `/products/delete/${id}`;
    return apiClient.put(url);
  }
};

export default productAPI;