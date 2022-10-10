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
        addItemToOrder: async ({orderID, menuItem, menuItemShortName, howMany}) => {
            let body = JSON.stringify(
                {
                    "menuItemId": menuItem,
                    "menuItemShortName": menuItemShortName,
                    "howMany": howMany
                }
            )
            let order = await (await axios.post(`http://${BFF_HOST}/addItemToOrder/${orderID}`, body, {
                headers: {
                  'Content-Type': 'application/json'
                }})).data;
            return order.lines;
        },
        removeItemToOrder: async ({orderID, menuItem})=> {
            let order = await (await axios.delete(`http://${BFF_HOST}/order/${orderID}/item/${menuItem}`)).data;
            return order.lines;
        },
        sendOrderToPreparation: async ({orderID}) => {
            let order = await (await axios.post(`http://${BFF_HOST}/sendItemToPrep/${orderID}`)).data;
            return order.lines;
        },
        getOrderDetails: async ({orderId}) => {
            return await (await fetch(`http://${BFF_HOST}/tableOrders/${orderId}`)).data;
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
            return order['_id'];
        },
        /**
         * Add in dining service a new item menus.
         * return the new state of the items list
         */
        addItemToOrder: async ({orderID, menuItem, menuItemShortName, howMany}) => {
            let DINING_URL = process.env.REACT_APP_DINING_URL;
            let option = postOption(JSON.stringify(
                {
                    "menuItemId": menuItem,
                    "menuItemShortName": menuItemShortName,
                    "howMany": howMany
                }
            ));
            let order = await extractBody(`http://${DINING_URL}/tableOrders/${orderID}`, option);
            return order['lines'];
        },
        sendOrderToPreparation: async ({orderId}) => {
            let DINING_URL = process.env.REACT_APP_DINING_URL;

            console.log(`Send order for preparation ${orderId}`);

            return await fetch(`http://${DINING_URL}/tableOrders/${orderId}/prepare`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            });
        },

        removeItemToOrder: async ({orderID, menuItem}) => {
            let DINING_URL = process.env.REACT_APP_DINING_URL;
            let option =
                {
                    method : "DELETE"
                }
            let order = await extractBody(`http://${DINING_URL}/tableOrders/${orderID}/${menuItem}`, option);
            return order['lines'];
        },

        getOrderDetails: async ({orderId}) => {
            const DINING_URL = process.env.REACT_APP_DINING_URL;

            return await (await fetch(`http://${DINING_URL}/tableOrders/${orderId}`)).json();
        }
    }
};

export default config;