import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BFF = process.env.REACT_APP_BFF_HOST;

export const getPreparations = createAsyncThunk(
	'get/preparations',
	async ({tableNumber}) => {
		return await (await fetch(`http://${BFF}/preparations/${tableNumber}`)).json();
	}
);

const preparationSlice = createSlice({
	name: 'preparations',
	initialState: {
		started: [],
		ready: []
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getPreparations.fulfilled, (state, action) => {
				state.started = action.payload.started;
				state.ready = action.payload.ready;
			})
	}
});

export const {} = preparationSlice.actions;

export default preparationSlice.reducer;