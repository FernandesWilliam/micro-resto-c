import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import catalogConfig from '../config/catalog-config.js';

const initialState = {
    menus: [],
};

/**
 * This thunk is used to call the api in order to get all menus
 */
export const getMenusAsync = createAsyncThunk(
    'menus',
    catalogConfig[process.env.REACT_APP_CONFIG]['fetchMenus']
);

/****************** SELECTOR *************************/

/**
 * Get all existing menus
 */
export const selectMenus = (state) => state.catalog.menus;
/**
 * Get selected Menu
 * @param id u could specify the given id
 */
export const selectMenuByID = (state, id) => state.catalog.menus.filter((menu) => menu._id === id)[0];
/****************** SELECTOR *************************/



export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        /*
         * When menus are fetched , then catch the result, and add items to the store
         */
        builder.addCase(getMenusAsync.fulfilled, (state, action) => {
            state.menus.push(...action.payload);
        });
    },
});
export const {getMenuByID} = catalogSlice.actions;


export default catalogSlice.reducer;