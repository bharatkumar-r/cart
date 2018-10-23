import { version } from '../../package.json';
import { Router } from 'express';
import carts from './carts';
import httpReq from '../lib/httpReq';
 
export default ({ config, constants }) => {

        let api = Router();

        // mount the facets resource
        api.use('/carts', function (req, res, next) {
            if (req.header.access_token) {
                next();
            } else {
                console.log('access token url... ', constants.fetchToken);
                httpReq
                .httpGet(constants.fetchToken, null, false, null, false)
                .then(function(results) {
                    config.commerceTools.access_token = results.access_token;
                    constants.headers.Authorization = "Bearer " + config.commerceTools.access_token;
                    next();
                });
            }
        }, carts({ config, constants }));

        // perhaps expose some API metadata at the root
        api.get('/', (req, res) => {
            res.json({ version });
        });

        api.get('/token', (req, res) => {

        });

        return api;
}
