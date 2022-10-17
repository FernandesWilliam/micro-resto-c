import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import catalogConfig from "../config/catalog-config.js";
import {preparationConfig} from "../config/preparation-config";

// Fetch my current configuration
const preparationsMethods = preparationConfig[process.env.REACT_APP_CONFIG];

export const sendOrderToPreparationAsync = createAsyncThunk(
    'send/preparation',
    catalogConfig[process.env.REACT_APP_CONFIG]['sendOrderToPreparation']
);

export const getPreparations = createAsyncThunk(
    'get/preparations',
    preparationsMethods['fetchPreparations']
)


export const preparationSlice = createSlice({
    name: 'preparations',
    initialState: {
        started: [/* Initial table of orders sent for preparation to the kitchen */],
        ready: [/* Initial table of orders ready for pickup */]
    },
    reducers: {},
    extraReducers: (builder) => {
        /*
         * When menus are fetched , then catch the result, and add items to the store
         */
        builder.addCase(sendOrderToPreparationAsync.fulfilled, (state, action) => {
            // remove the order
            //
        });

        /**
         * Get the preparations
         */
        builder.addCase(getPreparations.fulfilled, (state, action) => {
            state.started = action.payload.started;
            state.ready = action.payload.ready;
        })
    },
});

export const { } = preparationSlice.actions;

export const preparationReducer = preparationSlice.reducer;