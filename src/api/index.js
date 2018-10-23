import { version } from '../../package.json';
import { Router } from 'express';
import carts from './carts';
 
export default ({ config, constants }) => {

        let api = Router();

        // mount the facets resource
        api.use('/carts', carts({ config, constants }));

        // perhaps expose some API metadata at the root
        api.get('/', (req, res) => {
            res.json({ version });
        });

        api.get('/token', (req, res) => {

        });

        return api;
}
