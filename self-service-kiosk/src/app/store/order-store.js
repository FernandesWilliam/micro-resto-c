import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import orderConfig from '../config/order-config.js';

const initialState = {
    currentOrderId: undefined,
    currentTable: undefined,
    /***
     * Only keeps {orderID:{[all items]}}
     */
    orderItems: [],
};


/****************** THUNK **********************/
/**
 * Thunk that start an order
 */
export const startOrderAsync = createAsyncThunk(
    'start/order',
    orderConfig[process.env.REACT_APP_CONFIG]['startOrder']
);
/**
 * Thunk that add a new item menus
 */
export const addItemToOrderAsync = createAsyncThunk(
    'add/order',
    orderConfig[process.env.REACT_APP_CONFIG]['addItemToOrder']
);
/**
 * Thunk that remove an item menus
 */
export const removeItemToOrderAsync = createAsyncThunk(
    'remove/order',
    orderConfig[process.env.REACT_APP_CONFIG]['removeItemToOrder']
);


/**
 * Thunk that get the order ID
 */
export const selectIdOrder = (state) => {
    //console.log(state.order.currentOrderId)
    return state.order.currentOrderId;
};

export const selectItemsOrder = (state) => {
    return state.order.orderItems;
};

export const selectOrderTable = (state) => {
    return state.order.currentTable;
};


/**
 * Thunk that send the current order to preparation phase
 */
export const sendOrderToPreparationAsync = createAsyncThunk(
    'send/order',
    orderConfig[process.env.REACT_APP_CONFIG]['sendOrderToPreparation']
);
/****************** THUNK **********************/

/****************** SELECTOR *************************/
//const selectOrderByID = (state, id) => state.order.orderItems[id];
/****************** SELECTOR *************************/


export const orderSlice = createSlice({
        name: 'order',
        initialState,
        reducers: {
            forgetOrder(state) {
                state.orderItems = [];
                state.currentTable = undefined;
                state.currentOrderId = undefined;
            }
        },
        /**
         * Extra reducers are used to add thunk behavior
         * They are trigger after the thunk behavior.
         * @param builder
         */

        extraReducers: (builder) => {
            /**
             * Add to the store the currentOrder processed.
             */
            builder.addCase(startOrderAsync.fulfilled, (state, action) => {
                state.currentOrderId = action.payload?.['_id'] || 0;
                state.currentTable = action.payload?.tableNumber || 0;
            });

            /**
             * Add to the store the newest item added.
             */
            builder.addCase(addItemToOrderAsync.fulfilled, (state, action) => {
                state.orderItems = action.payload;
            });

            builder.addCase(removeItemToOrderAsync.fulfilled, (state, action) => {
                state.orderItems = action.payload;
            });

            /***
             * When the order has been sent in preparation clean the store
             */
            builder.addCase(sendOrderToPreparationAsync.fulfilled, (state, action) => {

                state.currentTable = state.currentTable === 0 ? action.payload.tableNumber : state.currentTable;

            });
        },
    })
;

export const {forgetOrder} = orderSlice.actions;


export default orderSlice.reducer;