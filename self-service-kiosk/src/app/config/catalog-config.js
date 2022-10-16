
/**
 * Main catalog config. It will be used to store the behavior of each api calls.
 */
export const catalogConfig = {
    /**
     * Front manager, It calls the dining service directly
     */
    'fm': {
        fetchMenus: async () => {
            let menuPort = process.env.REACT_APP_MENU_URL;
            let res = await fetch(`http://${menuPort}/menus`);
            let resJson = await res.json();
            console.log("Fetching menu items from \n"+`http://${menuPort}/menus` + " \nReturned : "+JSON.stringify(resJson, null, "\t"));
            return resJson
        }
    },
    /**
     * Bff manager, It calls the bff, and receive the response
     */
    'bff': {
        fetchMenus: async () => {
            const BFF_HOST = process.env.REACT_APP_BFF_HOST;
            let res = await fetch(`http://${BFF_HOST}/menus`);
            let resJson = await res.json();
            console.log("Fetching menu items from \n"+`http://${BFF_HOST}/menus` + " \nReturned : "+JSON.stringify(resJson,null, "\t"));
            return resJson
        }
    }
};

export default catalogConfig;