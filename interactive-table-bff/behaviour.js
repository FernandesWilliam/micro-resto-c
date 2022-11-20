import axios  from 'axios';

const DINING = process.env.DINING;
const MENU = process.env.MENU;
const KITCHEN = process.env.KITCHEN;

axios.defaults.headers.post['Content-Type'] = 'application/json';

export async function getMenu() {
	return await (await axios.get(`http://${MENU}/menus`)).data;
}

async function startOrder(tableNumber, partitionNumber) {
	let order;
	try {
		order = await (await axios.post(`http://${DINING}/tableOrders`, {
			tableNumber: parseInt(tableNumber),
			customersCount: 1,
			kioskOrder: false,
			tablePartitionNumber: parseInt(partitionNumber)
		})).data;
	} catch (ignored) {
		const res = await (await axios.get(`http://${DINING}/tables/${tableNumber}`)).data;
		order = {
			_id: res.tableOrderId
		}
	}
	return {
		_id: order['_id']
	}
}

async function addItemToOrder(orderID, tablePartitionNumber, element) {
	if (element.sentInPreparation) return;

	return await (await axios.post(`http://${DINING}/tableOrders/${orderID}?tablePartitionNumber=${tablePartitionNumber}`, JSON.stringify({
		menuItemId: element.item._id,
		menuItemShortName: element.item.shortName,
		howMany: element.howMany
	}))).data;
}

export async function sendItemsToPreparation(tableNumber, partitionNumber, order) {
	let { _id } = await startOrder(tableNumber, partitionNumber);
	for (const element of order) {
		await addItemToOrder(_id, partitionNumber, element);
	}
	await (await axios.post(`http://${DINING}/tableOrders/${_id}/prepare`)).data;
	return { _id }
}

export async function billOrder(orderId, partitionNumber) {
	let query = '';
	if (partitionNumber)
		query = `?tablePartitionNumber=${partitionNumber}`;

	const res = await (await axios.post(`http://${DINING}/tableOrders/${orderId}/bill${query}`)).data;

	return { billed: res.billed };
}

export async function getOrderId(tableNumber) {
	return {
		orderId: (await (await axios.get(`http://${DINING}/tables/${tableNumber}`)).data)["tableOrderId"]
	}
}

export async function getPreparations(tableNumber) {
	if (tableNumber === 'null') return [];

	let started = await fetchPreparations('preparationStarted', tableNumber);
	let ready = await fetchPreparations('readyToBeServed', tableNumber);

	return [...started, ...ready];
}

function toDishStatus(dish) {
	return {
		shortName: dish.shortName,
		startedAt: dish.startedAt,
		finishedAt: dish.finishedAt
	}
}

function toPreparationStatus(preparation) {
	return [...preparation.preparedItems.map((dish) => toDishStatus(dish))];
}

async function fetchPreparations(state, tableNumber) {
	const res = await (await axios.get(`http://${KITCHEN}/preparations?tableNumber=${tableNumber}&state=${state}`)).data;

	let ret = [];

	res.forEach((preparation) => {
		ret.push(...toPreparationStatus(preparation));
	})

	return ret;
}