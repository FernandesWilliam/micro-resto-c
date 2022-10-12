import axios from 'axios';

const extractBody = async (url, option = {}) => {
    const data = await (await fetch(url, option)).json();
    return data;
}
const postOption = (data) => ({
    method: 'POST',
    body: data,
    headers: {'Content-Type': 'application/json'},

});

const BFF_HOST = process.env.REACT_APP_BFF_HOST;

/**
 * Main order config. It will be used to store the behavior of each api calls
 */
const config = {

    'bff': {
        startOrder: async () => {
            const orderId = await (await axios.post(`http://${BFF_HOST}/startOrder`)).data;
            return orderId;
        },
        /**
         * Add into the order store a new item or update the quantity
         * @param orderID
         * @param _id
         * @param shortName
         * @param howMany
         * @param thunkBundle
         * @return {Promise<*[]>}
         */
        addItemToOrder: async ({orderID, _id, shortName, howMany}, thunkBundle) => {
            let itemOrder = {
                sendForPreparation: false,
                item: {
                    _id,
                    shortName
                },
                howMany
            };

            let orderItems = [...thunkBundle.getState().order.orderItems];
            let index = orderItems.findIndex((orderItem) => orderItem.item._id === _id);
            if (index !== -1) {
                const item = orderItems[index];
                itemOrder.howMany += item.howMany;
                orderItems.splice(index, 1);
            }
            orderItems.push(itemOrder);
            return orderItems;
        },
        removeItemToOrder: async ({orderID, menuItem}, thunkBundle) => {
            let itemOrder = {
                sendForPreparation: false,
                item: {},
                howMany: 0,
            };
            let orderItems = [...thunkBundle.getState().order.orderItems];
            let index = orderItems.findIndex((orderItem) => orderItem.item._id === menuItem);
            let item = orderItems[index];
            if (index !== -1) {
                itemOrder.howMany = item.howMany - 1;
                itemOrder.item = item.item
                orderItems.splice(index, 1);
                if(itemOrder.howMany>0)
                    orderItems.push(itemOrder);
                return orderItems;
            }
            return thunkBundle.getState().order.orderItems.filter(element => element._id !== menuItem._id);
        },
        sendOrderToPreparation: async ({orderID}) => {
            let order = await (await axios.post(`http://${BFF_HOST}/prepareOrder/${orderID}`)).data;
            return order.lines;
        }
    },
    'fm': {
        /**
         * Go fetch all existing tables
         * check if there is one table available, if not create one.
         * then create a new order.
         */
        startOrder: async () => {
            let DINING_URL = process.env.REACT_APP_DINING_URL;
            // fetch all tables
            let tables = await extractBody(`http://${DINING_URL}/tables`);
            // filter by availability
            let table = tables.filter((table) => !table['taken'])?.[0];
            if (table === undefined) {
                let maxTableCount = Math.max(...tables.map((table => table.number)));
                let option = postOption(JSON.stringify({number: maxTableCount + 1}));
                table = await extractBody(`http://${DINING_URL}/tables`, option);
            }
            let option = postOption(JSON.stringify({
                "tableNumber": table['number'],
                "customersCount": 1
            }));
            // create an order
            let order = await extractBody(`http://${DINING_URL}/tableOrders`, option);
            // return the order id
            return order;
        },
        /**
         * Add in dining service a new item menus.
         * return the new state of the items list
         */
        addItemToOrder: async ({orderID, _id, shortName, howMany}) => {
            let DINING_URL = process.env.REACT_APP_DINING_URL;
            let option = postOption(JSON.stringify(
                {
                    "menuItemId": _id,
                    "menuItemShortName": shortName,
                    "howMany": howMany
                }
            ));
            let order = await extractBody(`http://${DINING_URL}/tableOrders/${orderID}`, option);
            return order['lines'];
        },
        sendOrderToPreparation: async ({orderId}) => {
            let DINING_URL = process.env.REACT_APP_DINING_URL;

            return await (await fetch(`http://${DINING_URL}/tableOrders/${orderId}/prepare`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })).json();
        },

        removeItemToOrder: async ({orderID, menuItem}) => {
            let DINING_URL = process.env.REACT_APP_DINING_URL;
            let option =
                    {
                    method: "DELETE"
                };
            let order = await extractBody(`http://${DINING_URL}/tableOrders/${orderID}/${menuItem}`, option);
            return order['lines'];
        },
    }
};

export default config;