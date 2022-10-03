/**
 * Main catalog config. It will be used to store the behavior of each api calls.
 */
export default {
    /**
     * Front manager, It calls the dining service directly
     */
    'fm': {
        fetchMenus: async () => {
            let menuPort = process.env.REACT_APP_GATEWAY;
            let res = await fetch(`http://localhost:${menuPort}/menus`);
            return await res.json();
        }
    },
    /**
     * Bff manager, It calls the bff, and receive the response
     */
    'bff': {
        fetchMenus: async () => {
            let bffPort = process.env.REACT_APP_BFF_PORT;
            let res = await fetch(`http://localhost:${bffPort}/menus`);
            return await res.json();
        }
    }
};

