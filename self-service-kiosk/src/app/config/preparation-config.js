const KITCHEN_HOST = process.env.REACT_APP_KITCHEN_URL;
const BFF_HOST = process.env.REACT_APP_BFF_HOST;

export const preparationConfig = {
    'fm': {
        //  This will be use to store the preparation
        preparations: new Map(),
        fetchPreparationsStarted: async () => {
            let pathPreparationStarted = `http://${KITCHEN_HOST}/preparations?state=preparationStarted`
            let res = await (await fetch(pathPreparationStarted)).json();
            console.log("Fetch started preparations : \n"+pathPreparationStarted+ " : " + JSON.stringify(res,null, "\t"))

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
            let pathPreparationReady = `http://${KITCHEN_HOST}/preparations?state=readyToBeServed`
            let res = await (await fetch(pathPreparationReady)).json();
            console.log("Fetch ready preparations : \n"+pathPreparationReady+ " : " + JSON.stringify(res),null, "\t")

            let effective = new Set();

            res.forEach((preparation) => {
                if (preparationConfig['fm'].preparations.has(preparation.tableNumber)) {
                    preparationConfig['fm'].preparations.get(preparation.tableNumber).set(preparation._id, true);
                    effective.add(preparation.tableNumber);
                }
            });

            let prepared = [];

            preparationConfig['fm'].preparations.forEach((value, key) => {
                if ([...value.values()].filter((val) => !val).length <= 0 && effective.has(key)) {
                    prepared.push(key);
                }
            });

            return prepared;
        }
    },
    'bff': {
        // Bff part is mock as the BFF is not yet implemented
        fetchPreparationsStarted: async () => {
            let pathPreparationStarted = `http://${BFF_HOST}/preparations?state=preparationStarted`;
            let jsonPreparationState = await (await fetch(pathPreparationStarted)).json();
            console.log("Fetch started preparations : \n"+pathPreparationStarted+ " : "+JSON.stringify(jsonPreparationState,null, "\t"))
            return jsonPreparationState
        },
        fetchPreparationsReady: async () => {
            let pathPreparationReady = `http://${BFF_HOST}/preparations?state=readyToBeServed`;
            let jsonPreparationState = await (await fetch(`http://${BFF_HOST}/pathPreparationReady`)).json();
            console.log("Fetch ready preparations : \n"+pathPreparationReady+ " : "+JSON.stringify(jsonPreparationState,null, "\t"));
            return jsonPreparationState;
        }
    }
}

export default preparationConfig;