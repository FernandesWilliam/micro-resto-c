const KITCHEN_HOST = process.env.REACT_APP_KITCHEN_URL;
const BFF_HOST = process.env.REACT_APP_BFF_HOST;

export const preparationConfig = {
    'fm': {
        //  This will be use to store the preparation
        preparations: new Map(),
        fetchPreparationsStarted: async () => {
            let res = await (await fetch(`http://${KITCHEN_HOST}/preparations?state=preparationStarted`)).json();

            res.forEach((preparation) => {
                let table;
                if (preparationConfig['fm'].preparations.has(preparation.tableNumber)) {
                    table = preparationConfig['fm'].preparations.get(preparation.tableNumber);
                }
                else {
                    table = new Map();
                }
                table.set(preparation._id, false); // Boolean define if the preparation is ready
                preparationConfig['fm'].preparations.set(preparation.tableNumber, table);
            });

            let started = [];

            preparationConfig['fm'].preparations.forEach((value, key) => {
                if ([...value.values()].filter((val) => !val).length > 0) {
                    started.push(key);
                }
            })

            return started;
        },
        fetchPreparationsReady: async () => {
            let res = await (await fetch(`http://${KITCHEN_HOST}/preparations?state=readyToBeServed`)).json();

            res.forEach((preparation) => {
                if (preparationConfig['fm'].preparations.has(preparation.tableNumber)) {
                    preparationConfig['fm'].preparations.get(preparation.tableNumber).set(preparation._id, true);
                }
            });

            let prepared = [];

            preparationConfig['fm'].preparations.forEach((value, key) => {
                if ([...value.values()].filter((val) => !val).length <= 0) {
                    prepared.push(key);
                }
            })

            return prepared;
        }
    },
    'bff': {
        // Bff part is mock as the BFF is not yet implemented
        fetchPreparationsStarted: async () => {
            return await (await fetch(`http://${BFF_HOST}/preparations?state=preparationStarted`)).json()
        },
        fetchPreparationsReady: async () => {
            return await (await fetch(`http://${BFF_HOST}/preparations?state=readyToBeServed`)).json()
        }
    }
}

export default preparationConfig;