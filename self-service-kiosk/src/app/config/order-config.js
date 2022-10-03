const extractBody = async (url, option = {}) => await (await fetch(url, option)).json();
const postOption = (data) => ({
    method: 'POST',
    body: data,
    headers: {'Content-Type': 'application/json'},

});


/**
 * Main order config. It will be used to store the behavior of each api calls
 */
export default {

    'bff': {
        startOrder: async () => {

        },

        addItemToOrder: async (orderID, menuItem, menuItemShortName, howMany) => {
            return;
        },
        removeItemToOrder: async (orderID) => {

        },
        sendItemToPreparation: async () => {

        }

    },
    'fm': {
        /**
         * Go fetch all existing tables
         * check if there is one table available, if not create one.
         * then create a new order.
         */
        startOrder: async () => {
            let diningPort = 9500;
            // fetch all tables
            let tables = await extractBody(`http://localhost:${diningPort}/dining/tables`);
            // filter by availability
            let table = tables.filter((table) => !table['taken'])?.[0];
            if (table === undefined) {
                let maxTableCount = Math.max(...tables.map((table => table.number)));
                let option = postOption(JSON.stringify({number: maxTableCount + 1}));
                table = await extractBody(`http://localhost:${diningPort}/dining/tables`, option);
            }
            let option = postOption(JSON.stringify({
                "tableNumber": table['number'],
                "customersCount": 1
            }));
            // create an order
            let order = await extractBody(`http://localhost:${diningPort}/dining/tableOrders`, option);

            console.log(order['_id'], table['number']);
            // return the order id
            return order['_id'];
        },
        /**
         * Add in dining service a new item menus.
         * return the new state of the items list
         */
        addItemToOrder: async ({orderID, menuItem, menuItemShortName, howMany}) => {
            let diningPort = 9500;
            let option = postOption(JSON.stringify(
                {
                    "menuItemId": menuItem,
                    "menuItemShortName": menuItemShortName,
                    "howMany": howMany
                }
            ));
            let order = await extractBody(`http://localhost:${diningPort}/dining/tableOrders/${orderID}`, option);
            return order['lines'];
        },
        removeItemToOrder: async (orderID) => {

        }
    }
};

