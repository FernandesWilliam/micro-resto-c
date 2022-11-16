import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const BFF = process.env.REACT_APP_BFF_HOST;

export const getMenu = createAsyncThunk(
	'menu',
	async ({}) => {
		const res = await (await fetch(`http://${BFF}/menus`)).json();
		console.log('[Menu]: ', res);
		return res;
	}
)

const catalogSlice = createSlice({
	name: 'catalog',
	initialState: {
		menu: []
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getMenu.fulfilled, (state, action) => {
				state.menu = action.payload;
			});
	}
});

export const {} = catalogSlice.actions;

export default catalogSlice.reducer;

export const selectMenu = (state) => state.catalog.menu;
export const selectItemById = (menu, id) => menu.find((item) => item._id === id);