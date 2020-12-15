import React from "react";
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
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import OrderDetail from "../orderDetail";
import calTotal from "utils/calTotal";
import formatDate from "utils/formatDate";
import orderAPI from "api/order";
import useNotification from "utils/hooks/notification";
import transactionAPI from "api/transaction";
import payoutAPI from "api/payout";

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	},
	summary: {
		display: "flex",
		alignItems: "center"
	},
	avatar: {
		marginRight: 20
	},
	username: {
		fontFamily: "Montserrat",
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		marginRight: 40
	},
	quantity: {
		fontFamily: "Montserrat",
		fontSize: theme.typography.pxToRem(15),
		color: "#d33b33"
	},
	total: {
		fontFamily: "Montserrat",
		lineHeight: "normal",
		fontSize: 18,
		color: "#d33b33",
		display: "flex",
		justifyContent: "space-between"
	},
	line: {
		marginTop: 20,
		marginBottom: 20
	},
	title: {
		fontFamily: "Montserrat",
		fontSize: 18,
		color: "#d33b33"
	},
	address: {
		fontFamily: "Montserrat",
		fontSize: "#666666 !important"
	},
	date: {
		fontFamily: "Montserrat",
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		marginLeft: 60
	}
}));

const MyOrder = ({ orders, fetchOrder }) => {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);
	const { showError, showSuccess } = useNotification();
	const handleChange = panel => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	const createTransaction = async transaction => {
		try {
			await transactionAPI.add(transaction);
			await payoutAPI.payout({ amount: transaction.amount });
		} catch (error) {
			console.log("Failed to create transaction: ", error);
		}
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
							<Typography className={classes.username}>
								Đơn hàng {order.id}
							</Typography>
							<Avatar
								alt=""
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
						<div className="container">
							<div className="row">
								<div className="col-lg-6 col-md-12">
									{order.orderDetails.map((detail, index) => (
										<OrderDetail
											key={index}
											orderDetail={detail}
											orderStatus={order.statusId}
										/>
									))}
								</div>
								<div className="col-lg-6 col-md-12 detail">
									<Typography className={classes.total}>
										Tổng tiền hàng: <span>${calTotal(order.orderDetails)}</span>
									</Typography>
									<Divider className={classes.line} />
									<Typography className={classes.total}>
										Phí vận chuyển: <span>${order.transportation.cost}</span>
									</Typography>
									<Divider className={classes.line} />
									<Typography className={classes.total}>
										Tổng cộng:{" "}
										<span>
											$
											{calTotal(order.orderDetails) + order.transportation.cost}
										</span>
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
									{order.statusId === 1 && (
										<>
											<Divider className={classes.line} />
											<button
												className="order-action"
												onClick={async () => {
													console.log("statusId: ", order.statusId);
													try {
														const statusId = 6;
														const response = await orderAPI.editStatus(
															{
																statusId
															},
															order.id
														);
														await fetchOrder();
														if (order.paymentMethod === "Paypal") {
															createTransaction({
																userId: order.userId,
																orderId: order.id,
																amount:
																	calTotal(order.orderDetails) +
																	order.transportation.cost
															});
														}
														showSuccess("Đã hủy đơn hàng");
													} catch (error) {
														showError("Không thành công");
													}
												}}
											>
												Hủy đơn hàng
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

export default MyOrder;
