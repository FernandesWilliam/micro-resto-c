import axios from 'axios';

const extractBody = async (url, option = {}) => {
    const data = await (await fetch(url, option)).json();
    return data;
};
const postOption = (data) => ({
    method: 'POST',
    body: data,
    headers: {'Content-Type': 'application/json'},

});
const BFF_HOST = process.env.REACT_APP_BFF_HOST;
const itemPayload = (_id, shortName, howMany) => ({
    sendForPreparation: false,
    item: {
        _id,
        shortName
    },
    howMany
});


/**
 * Main order config. It will be used to store the behavior of each api calls
 */
const config = {

    'bff': {
        startOrder: async () => {
            //const orderId = await (await axios.post(`http://${BFF_HOST}/startOrder`)).data;
            //return orderId;
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
            let itemOrder = itemPayload(_id, shortName, howMany);

            let orderItems = [...thunkBundle.getState().order.orderItems];
            let index = orderItems.findIndex((orderItem) => orderItem.item._id === _id);
            if (index !== -1) {
                const item = orderItems[index];
                itemOrder.howMany += item.howMany;
                orderItems.splice(index, 1, itemOrder);
            } else orderItems.push(itemOrder);
            return orderItems;
        },
        removeItemToOrder: async ({orderID, menuItem}, thunkBundle) => {
            let itemOrder = itemPayload('', '', 0);
            let orderItems = [...thunkBundle.getState().order.orderItems];
            let index = orderItems.findIndex((orderItem) => orderItem.item._id === menuItem);
            let item = orderItems[index];
            if (index === -1)
                return orderItems.filter(element => element._id !== menuItem._id);
            itemOrder.howMany = item.howMany - 1;
            itemOrder.item = item.item;
            itemOrder.howMany > 0 ? orderItems.splice(index, 1, itemOrder) : orderItems.splice(index, 1);
            return orderItems;

        },
        sendOrderToPreparation: async ({orderId}, thunkBundle) => {
            let path = `http://${BFF_HOST}/prepareOrder`;
            let prepareData = await (await axios.post(path, thunkBundle.getState().order.orderItems)).data;
            console.log("Send order to preparation : \n"+ path + " \nReturned : "+ JSON.stringify(prepareData, null, "\t"));
            return prepareData;
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
            let pathTables = `http://${DINING_URL}/tables`;
            let tables = await extractBody(pathTables);
            console.log("Fetch tables : \n"+pathTables + " \nReturned : " + JSON.stringify(tables,null, "\t"))

            // filter by availability
            let table = tables.filter((table) => !table['taken'])?.[0];
            if (table === undefined) {
                let maxTableCount = Math.max(...tables.map((table => table.number)));
                let option = postOption(JSON.stringify({number: maxTableCount + 1}));
                console.log("Not enough tables, add new tables : \n"+pathTables)
                table = await extractBody(pathTables, option);
            }
            let option = postOption(JSON.stringify({
                "tableNumber": table['number'],
                "customersCount": 1
            }));
            // create an order
            let diningPath = `http://${DINING_URL}/tableOrders`;
            let order = await extractBody(diningPath, option);
            console.log("Create an order \n"+JSON.stringify(option,null, "\t")+ " : \n"+diningPath+ "\nReturned : "+ JSON.stringify(order,null, "\t"));

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
            let diningPath = `http://${DINING_URL}/tableOrders/${orderID}`;
            let order = await extractBody(diningPath, option);
            console.log("Add item "+JSON.stringify(option,null, "\t")+ " to order : \n"+diningPath+ "\nReturned : "+ JSON.stringify(order,null, "\t"));

            return order['lines'];
        },
        sendOrderToPreparation: async ({orderId}) => {
            let DINING_URL = process.env.REACT_APP_DINING_URL;
            let preparePath = `http://${DINING_URL}/tableOrders/${orderId}/prepare`;
            let preparationJson = await (await fetch(preparePath, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            })).json();
            console.log("Send order "+orderId+" to preparation : \n"+preparePath+ "\nReturned :  "+ JSON.stringify(preparationJson,null, "\t"));

            return preparationJson
        },

        removeItemToOrder: async ({orderID, menuItem}) => {
            let DINING_URL = process.env.REACT_APP_DINING_URL;
            let option =
                {
                    method: "DELETE"
                };

            let diningPath = `http://${DINING_URL}/tableOrders/${orderID}/${menuItem}`;
            let order = await extractBody(diningPath, option);
            console.log("Remove item "+menuItem+ " to order : \n"+diningPath+ "\nReturned : "+ JSON.stringify(order['lines'],null, "\t"));
            return order['lines'];
        },
    }
};

export default config;