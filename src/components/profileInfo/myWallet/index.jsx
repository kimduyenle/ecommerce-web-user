import React from 'react';
import 'antd/dist/antd.css';
import { Table, Card, Space } from 'antd';

const columns = [
	{
		title: 'Đơn hàng',
		dataIndex: 'order',
		key: 'order'
	},
	{
		title: 'Số tiền giao dịch',
		dataIndex: 'amount',
		key: 'amount',
		render: text => <span>${text}</span>
	},
	{
		title: 'Ngày giao dịch',
		dataIndex: 'date',
		key: 'date'
	},
	{
		title: 'Trạng thái',
		key: 'status',
		dataIndex: 'status'
	}
];

const data = [
	{
		key: '1',
		order: '9',
		amount: 20,
		date: '09/12/2020 15:40:32',
		status: 'Thành công'
	},
	{
		key: '2',
		order: '12',
		amount: 12,
		date: '09/12/2020 15:40:32',
		status: 'Thành công'
	},
	{
		key: '3',
		order: '5',
		amount: 10,
		date: '09/12/2020 15:40:32',
		status: 'Đang xử lý'
	}
];

const MyWallet = () => {
	return (
		<>
			<Space size={16} direction='vertical' style={{ width: '100%' }}>
				<Card
					style={{
						width: 'fit-content',
						color: '#d33b33',
						fontSize: 24,
						fontWeight: 'bold'
					}}
				>
					<span>$50</span>
				</Card>
				<Table columns={columns} dataSource={data} pagination={false} />
			</Space>
		</>
	);
};

export default MyWallet;
