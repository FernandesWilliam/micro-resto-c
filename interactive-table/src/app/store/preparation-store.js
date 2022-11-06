import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BFF = process.env.REACT_APP_BFF_HOST;

export const getOrderStatus = createAsyncThunk(
	'get/preparations',
	async ({}, thunkBundle) => {
		const tableNumber = thunkBundle.getState().order.tableNumber;
		return await (await fetch(`http://${BFF}/preparations/${tableNumber}`)).json();
	}
);

const preparationSlice = createSlice({
	name: 'preparations',
	initialState: {
		status: []
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getOrderStatus.fulfilled, (state, action) => {
				state.status = action.payload;
			})
	}
});

export const {} = preparationSlice.actions;

export default preparationSlice.reducer;

export const selectOrderStatus = (state) => state.preparations.status;