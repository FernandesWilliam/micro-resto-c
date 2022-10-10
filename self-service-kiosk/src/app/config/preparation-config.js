const KITCHEN_HOST = process.env.REACT_APP_KITCHEN_URL;

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
            return [
                {_id: 492},
                {_id: 495},
                {_id: 496}
            ];
        },
        fetchPreparationsReady: async () => {
            return [
                {_id: 493},
                {_id: 494}
            ];
        }
    }
}