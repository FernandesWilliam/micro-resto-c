import axios from 'axios';

const DINING_SERVICE = process.env.DINING_SERVICE_URL_WITH_PORT || 'localhost:9500/dining';
const MENUS_SERVICE = process.env.MENU_SERVICE_URL_WITH_PORT || 'http://localhost:9500/menu';

export async function getMenus() {
    return await (await axios.get(`http://${MENUS_SERVICE}/menus`)).data 
}

export async function startOrder() {
    const table = await getAvailableTable();
    const order = await createOrder(table);
    return order['_id'];
}


async function getAvailableTable() {
    let tables = await (await axios.get(`http://${DINING_SERVICE}/tables`)).data
    // filter by availability
    let table = tables.filter((table) => !table['taken'])?.[0];
    if (table === undefined) {
        let maxTableCount = Math.max(...tables.map((table => table.number)));
        const jsonBody = JSON.stringify({number: maxTableCount + 1});
        table = await (await axios.post(`http://${DINING_SERVICE}/tables`, jsonBody)).data
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
    let body = JSON.stringify(element)
    let order = await (await axios.post(`http://${DINING_SERVICE}/tableOrders/${orderID}`, body, {
        headers: {
            'Content-Type': 'application/json'
        }})).data;
    return order;
}

export async function sendItemToPreparation(id) {
    return await (await axios.post(`http://${DINING_SERVICE}/tableOrders/${orderId}/prepare`)).data;
}

export async function removeItemFromOrder(orderID, menuItem) {
    let order = await (await axios.delete(`http://${DINING_SERVICE}/tableOrders/${orderID}/${menuItem}`)).data;
    return order;
}

export async function sendItemsToPreparation(orderId, elements) {
    for(const element of elements) {
        addItemToOrder(orderId, element)
    }
    return await (await axios.post(`http://${DINING_SERVICE}/tableOrders/${orderId}/prepare`)).data;
}