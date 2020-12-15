import apiClient from "./apiClient";

const transactionAPI = {
	getAll: () => {
		const url = "/transactions";
		return apiClient.get(url);
	},
	add: ({ userId, orderId, amount }) => {
		const url = "/transactions";
		return apiClient.post(url, {
			userId,
			orderId,
			amount
		});
	}
};

export default transactionAPI;
