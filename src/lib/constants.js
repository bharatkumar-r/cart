export default ({ config }) => {
    return {
        fetchToken: "http://localhost:8080/api/token",
        carts: config.commerceTools.apiUrl + config.commerceTools.projectKey +  "/carts/",        
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + config.commerceTools.access_token
        }

    }
};
