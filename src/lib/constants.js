export default ({ config }) => {
    return {
        fetchToken: config.commerceTools.authUrl + "/oauth/token?grant_type=client_credentials&scope=manage_project:",
        carts: config.commerceTools.apiUrl + config.commerceTools.projectKey +  "/carts/",        
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + config.commerceTools.access_token
        }

    }
};
