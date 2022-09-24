import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import orderConfig from '../config/order-config.js';

const initialState = {
    currentOrderId: undefined,
    orderItems:[],
};


export const startOrderAsync = createAsyncThunk(
    'start/order',
    orderConfig[process.env.REACT_APP_CONFIG]['startOrder']
);


export const addItemToOrderAsync = createAsyncThunk(
    'add/order',
    orderConfig[process.env.REACT_APP_CONFIG]['addItemToOrder']
);
export const removeItemToOrderAsync = createAsyncThunk(
    'remove/order',
    orderConfig[process.env.REACT_APP_CONFIG]['removeItemToOrder']
);


/****************** SELECTOR *************************/
/****************** SELECTOR *************************/



export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    /**
     * Extra reducers are used to add thunk behavior
     * They are trigger after the thunk behavior.
     * @param builder
     */

    extraReducers: (builder) => {
        /**
         */
        builder.addCase(startOrderAsync.fulfilled, (state, action) => {
            state.currentOrderId = action.payload;
        });

        builder.addCase(addItemToOrderAsync.fulfilled,(state,action)=>{

        })

        builder.addCase(removeItemToOrderAsync.fulfilled,(state,action)=>{

        })
    },
});
export const {} = orderSlice.actions;


export default orderSlice.reducer;