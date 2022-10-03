import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import catalogConfig from "../config/catalog-config.js";
import {getMenusAsync} from "./catalog-store.js";

const initialState = {
    preparationOrders: [],
    readyOrders: [],
};


export const sendOrderToPreparationAsync = createAsyncThunk(
    'send/preparation',
    catalogConfig[process.env.REACT_APP_CONFIG]['sendOrderToPreparation']
);


export const preparationSlice = createSlice({
    name: 'preparation',
    initialState,



    extraReducers: (builder) => {
        /*
         * When menus are fetched , then catch the result, and add items to the store
         */
        builder.addCase(sendOrderToPreparationAsync.fulfilled, (state, action) => {
            // remove l'order
            //
        });
    },



})





