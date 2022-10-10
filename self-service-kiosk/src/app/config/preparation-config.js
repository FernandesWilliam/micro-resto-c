const KITCHEN_HOST = process.env.REACT_APP_KITCHEN_URL;
const BFF_HOST = process.env.REACT_APP_BFF_HOST;

export const preparationConfig = {
    'fm': {
        fetchPreparationsStarted: async () => {
            let res = await fetch(`http://${KITCHEN_HOST}/preparations?state=preparationStarted`);

            return await res.json();
        },
        fetchPreparationsReady: async () => {
            let res = await fetch(`http://${KITCHEN_HOST}/preparations?state=readyToBeServed`);

            return await res.json();
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