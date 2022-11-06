import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BFF = process.env.REACT_APP_BFF_HOST;
const itemPayload = (_id, shortName, howMany) => ({
	sentInPreparation: false,
	item: {
		_id,
		shortName
	},
	howMany
});

export const addItemToOrder = createAsyncThunk(
	'add/item',
	({_id, shortName, howMany}, thunkBundle) => {
		let itemOrder = itemPayload(_id, shortName, howMany);
		let orderItems = [...thunkBundle.getState().order.orderItems];
		let index = orderItems.findIndex((orderItem) => orderItem.item._id === _id);
		if (index !== -1) {
			const item = orderItems[index];
			itemOrder.howMany += item.howMany;
			orderItems.splice(index, 1, itemOrder);
		} else orderItems.push(itemOrder);
		return orderItems;
	}
);

export const removeItemFromOrder = createAsyncThunk(
	'remove/item',
	({menuItem}, thunkBundle) => {
		let itemOrder = itemPayload('', '', 0);
		let orderItems = [...thunkBundle.getState().order.orderItems];
		let index = orderItems.findIndex((orderItem) => orderItem.item._id === menuItem);
		let item = orderItems[index];
		if (index === -1)
			return orderItems.filter(element => element._id !== menuItem._id);
		itemOrder.howMany = Math.max(item.howMany - 1, 0);
		itemOrder.item = item.item;
		itemOrder.howMany > 0 ? orderItems.splice(index, 1, itemOrder) : orderItems.splice(index, 1);
		return orderItems;
	}
);

export const sendOrderForPreparation = createAsyncThunk(
	'prepare',
	async ({}, thunkBundle) => {
		console.log('[State]: ', thunkBundle.getState());
		const state = thunkBundle.getState().order;

		return await (await fetch(`http://${BFF}/order/${state.tableNumber}/prepareOrder/${state.partitionNumber}`,
			{
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(state.orderItems)
			})).json();
	}
);

export const configureTableInfo = createAsyncThunk(
	'configure',
	async ({tableNumber, tablePartitionNumber}) => {
		return {
			tableNumber: tableNumber,
			tablePartitionNumber: tablePartitionNumber
		}
	}
)

const orderSlice = createSlice({
	name: 'order',
	initialState: {
		orderId: null,
		tableNumber: null,
		partitionNumber: null,
		orderItems: []
	},
	reducers: {
		forgetOrder(state) {
			state.orderId = null;
			state.orderItems = [];
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(addItemToOrder.fulfilled, (state, action) => {
				state.orderItems = action.payload;
			})
			.addCase(removeItemFromOrder.fulfilled, (state, action) => {
				state.orderItems = action.payload;
			})
			.addCase(sendOrderForPreparation.fulfilled, (state, action) => {
				state.orderId = action.payload;
			})
			.addCase(configureTableInfo.fulfilled, (state, action) => {
				state.tableNumber = action.payload.tableNumber;
				state.partitionNumber = action.payload.tablePartitionNumber;
			})
	}
});

export const {forgetOrder} = orderSlice.actions;

export default orderSlice.reducer;

export const selectOrderId = (state) => state.order.orderId;
export const selectOrderItems = (state) => state.order.orderItems;
export const selectTableNumber = (state) => state.order.tableNumber;
export const selectTablePartitionNumber = (state) => state.order.partitionNumber;