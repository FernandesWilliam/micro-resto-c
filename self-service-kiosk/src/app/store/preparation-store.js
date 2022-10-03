import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import catalogConfig from "../config/catalog-config.js";
import {preparationConfig} from "../config/preparation-config";

const preparationsMethods = preparationConfig[process.env.REACT_APP_CONFIG];

export const sendOrderToPreparationAsync = createAsyncThunk(
    'send/preparation',
    catalogConfig[process.env.REACT_APP_CONFIG]['sendOrderToPreparation']
);

/**
 * Fetch the preparations started
 */
export const getPreparationsStarted = createAsyncThunk(
    'preparationsStarted',
    preparationsMethods['fetchPreparationsStarted']
);

/**
 * Fetch the preparations ready to be served
 */
export const getPreparationsReady = createAsyncThunk(
    'preparationsReady',
    preparationsMethods['fetchPreparationsReady']
)


export const preparationSlice = createSlice({
    name: 'preparations',
    initialState: {
        started: [],
        ready: []
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

        builder.addCase(getPreparationsStarted.fulfilled, (state, action) => {
            state.started = action.payload
        })

        builder.addCase(getPreparationsReady.fulfilled, (state, action) => {
            state.ready = action.payload
        })
    },
});

export const { } = preparationSlice.actions;

export const preparationReducer = preparationSlice.reducer;