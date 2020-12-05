import React from 'react';
import {
	Avatar,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Typography,
	Card,
	CardContent,
	Divider,
	makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderDetail from '../orderDetail';
import calTotal from 'utils/calTotal';
import formatDate from 'utils/formatDate';
import orderAPI from 'api/order';
import useNotification from 'utils/hooks/notification';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%'
	},
	summary: {
		display: 'flex',
		alignItems: 'center'
	},
	avatar: {
		marginRight: 20
	},
	username: {
		fontFamily: 'Quattrocento Sans',
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		marginRight: 40
	},
	quantity: {
		fontFamily: 'Quattrocento Sans',
		fontSize: theme.typography.pxToRem(15),
		color: '#d33b33'
	},
	total: {
		fontFamily: 'Quattrocento Sans',
		lineHeight: 'normal',
		fontSize: 18,
		color: '#d33b33'
	},
	line: {
		marginTop: 20,
		marginBottom: 20
	},
	title: {
		fontFamily: 'Quattrocento Sans',
		fontSize: 18,
		color: '#d33b33'
	},
	address: {
		fontFamily: 'Quattrocento Sans',
		fontSize: '#666666 !important'
	},
	date: {
		fontFamily: 'Quattrocento Sans',
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		marginLeft: 60
	}
}));

const Order = ({ orders, fetchOrder }) => {
	const classes = useStyles();
	const { showError, showSuccess } = useNotification();
	const [expanded, setExpanded] = React.useState(false);

	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	return (
		<div className={classes.root}>
			{orders.map((order, index) => (
				<Accordion
					expanded={expanded === `panel${index + 1}`}
					onChange={handleChange(`panel${index + 1}`)}
					key={index}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls={`panel${index + 1}bh-content`}
						id={`panel${index + 1}bh-header`}
						c
					>
						<div className={classes.summary}>
							<Avatar
								alt=''
								className={classes.avatar}
								src={order.orderDetails[0].product.user.avatar}
							/>
							<Typography className={classes.username}>
								{order.orderDetails[0].product.user.username}
							</Typography>
							<Typography className={classes.quantity}>
								{order.orderDetails.length} sản phẩm
							</Typography>
							<Typography className={classes.date}>
								{formatDate(order.createdAt)}
							</Typography>
						</div>
					</AccordionSummary>
					<AccordionDetails>
						<div className='container'>
							<div className='row'>
								<div className='col-lg-6 col-md-12'>
									{order.orderDetails.map((detail, index) => (
										<OrderDetail key={index} orderDetail={detail} />
									))}
								</div>
								<div className='col-lg-6 col-md-12 detail'>
									<Typography className={classes.total}>
										Tổng tiền hàng: {calTotal(order.orderDetails)}
									</Typography>
									<Divider className={classes.line} />
									<Typography className={classes.total}>
										Phương thức thanh toán: {order.paymentMethod}
									</Typography>
									<Divider className={classes.line} />
									<Card>
										<CardContent>
											<Typography className={classes.title} gutterBottom>
												Địa chỉ nhận hàng
											</Typography>
											<Typography className={classes.address}>
												{order.user.username}
											</Typography>
											<Typography className={classes.address}>
												{order.deliveryPhoneNumber}
											</Typography>
											<Typography className={classes.address}>
												{order.deliveryAddress}
											</Typography>
										</CardContent>
									</Card>
									{order.statusId !== 4 && (
										<>
											<Divider className={classes.line} />
											<button
												className='order-action'
												onClick={async () => {
													console.log('statusId: ', order.statusId);
													try {
														const statusId = order.statusId + 1;
														const response = await orderAPI.editStatus(
															{
																statusId
															},
															order.id
														);
														await fetchOrder();
														showSuccess('Edited successfully.');
													} catch (error) {
														showError('Failed to edit.');
													}
												}}
											>
												{order.statusId === 1 && 'Xác nhận đơn hàng'}
												{order.statusId === 2 && 'Đang giao'}
												{order.statusId === 3 && 'Đã giao'}
											</button>
										</>
									)}
								</div>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
			))}
		</div>
	);
};

export default Order;