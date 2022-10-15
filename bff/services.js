import axios from 'axios';

const DINING_SERVICE = process.env.DINING_SERVICE_URL_WITH_PORT || 'localhost:9500/dining';
const MENUS_SERVICE = process.env.MENU_SERVICE_URL_WITH_PORT || 'http://localhost:9500/menu';
const KITCHEN_SERVICE = process.env.KITCHEN_URL || 'localhost:9500/kitchen';

export async function getMenus() {
    return await (await axios.get(`http://${MENUS_SERVICE}/menus`)).data 
}

export async function startOrder() {
    const table = await getAvailableTable();
    const order = await createOrder(table);
    return {
        _id: order['_id'],
        tableNumber: parseInt(order.tableNumber)
    };
}


async function getAvailableTable() {
    let tables = await (await axios.get(`http://${DINING_SERVICE}/tables`)).data;
    // filter by availability
    let table = tables.filter((table) => !table['taken'])?.[0];
    if (table === undefined) {
        let maxTableCount = Math.max(...tables.map((table => table.number)));
        const jsonBody = JSON.stringify({number: maxTableCount + 1});
        table = await (await axios.post(`http://${DINING_SERVICE}/tables`, jsonBody,{
            headers:{
                'Content-Type': 'application/json'
            }
        })).data
    }
    return table;
}

async function createOrder(table) {
    const jsonBody = JSON.stringify({
        tableNumber: table['number'],
        customersCount: 1
    })
    return await (await axios.post(`http://${DINING_SERVICE}/tableOrders`, jsonBody, {
        headers: {
            'Content-Type': 'application/json'
        }})).data
}

export async function addItemToOrder(orderID, element) {
    if (element.sendForPreparation)
        return;
    let body = JSON.stringify({
        menuItemId: element.item._id,
        menuItemShortName: element.item.shortName,
        howMany: element.howMany 
    })
    let order = await (await axios.post(`http://${DINING_SERVICE}/tableOrders/${orderID}`, body, {
        headers: {
            'Content-Type': 'application/json'
        }})).data;
    return order;
}

export async function removeItemFromOrder(orderID, menuItem) {
    let order = await (await axios.delete(`http://${DINING_SERVICE}/tableOrders/${orderID}/${menuItem}`)).data;
    return order;
}

export async function sendItemsToPreparation(order) {
    let {_id,tableNumber} = await startOrder();
    for(const element of order) {
        await addItemToOrder(_id, element);
    }
    await (await axios.post(`http://${DINING_SERVICE}/tableOrders/${_id}/prepare`)).data;
    return {tableNumber};
}

// Preparations

/**
 * Preparation storage. Allow to compute which one is completed and ready to be served for a self
 * service kiosk
 */
let preparations = new Map();

/**
 * Fast mapping to get the state (true | false) to give to an order on fetching and to find the filter
 * to apply
 */
const preparationConfig = {
    'preparationStarted': {
        state: false,
        filter: (array) => array.filter((val) => !val).length > 0
    },
    'readyToBeServed': {
        state: true,
        filter: (array) => array.filter((val) => !val).length <= 0
    }
}

/**
 * @param {string} state  The state of the preparations that shall be returned
 * @return {Promise<string[]>} The number of each "order" (tableNumber)
 */
export async function fetchPreparations(state) {
    const res = await (await axios.get(`http://${KITCHEN_SERVICE}/preparations?state=${state}`)).data;

    let effective = new Set();

    res.forEach((preparation) => {
        let table = preparations.has(preparation.tableNumber) ? preparations.get(preparation.tableNumber) : new Map();
        table.set(preparation._id, preparationConfig[state].state);
        preparations.set(preparation.tableNumber, table);
        effective.add(preparation.tableNumber);
    });

    let ret = [];

    preparations.forEach((value, key) => {
        if (preparationConfig[state].filter([...value.values()]) && effective.has(key)) {
            ret.push(key);
        }
    })

    return ret;
}