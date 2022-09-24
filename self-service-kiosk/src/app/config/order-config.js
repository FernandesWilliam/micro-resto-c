
/**
 * Main order config. It will be used to store the behavior of each api calls
 */
export default {

    'bff': {


    },
    'fm': {
        //TODO a faire
        startOrder: async () => {

        },

        addItemToOrder: async (orderID, menuItem, menuItemShortName, howMany) => {
            // fetch(`http://localhost:3001/tableOrders/${orderID}`, {
            //     method: 'POST',
            //     body: {menuItem, menuItemShortName, howMany}
            // });
        },
        removeItemToOrder: async (orderID) => {

        }
    }
};

