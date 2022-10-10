import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import catalogConfig from "../config/catalog-config.js";
import {preparationConfig} from "../config/preparation-config";

// Fetch my current configuration
const preparationsMethods = preparationConfig[process.env.REACT_APP_CONFIG];

export const sendOrderToPreparationAsync = createAsyncThunk(
    'send/preparation',
    catalogConfig[process.env.REACT_APP_CONFIG]['sendOrderToPreparation']
);

/**
 * Fetch the preparations started
 */
export const getPreparationsStarted = createAsyncThunk(
    // Action prefix which must be unique
    'preparationsStarted',
    // Method to call in my configuration
    preparationsMethods['fetchPreparationsStarted']
);

/**
 * Fetch the preparations ready to be served
 */
export const getPreparationsReady = createAsyncThunk(
    // Action prefix which must be unique
    'preparationsReady',
    // Method to call in my configuration
    preparationsMethods['fetchPreparationsReady']
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
         * Get the orders sent for preparations
         */
        builder.addCase(getPreparationsStarted.fulfilled, (state, action) => {
            state.started = action.payload
        })

        /**
         * Get the orders ready for pickup
         */
        builder.addCase(getPreparationsReady.fulfilled, (state, action) => {
            state.ready = action.payload
        })
    },
});

export const { } = preparationSlice.actions;

export const preparationReducer = preparationSlice.reducer;