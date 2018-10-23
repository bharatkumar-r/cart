import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import initializeDb from './db';
import middleware from './middleware';
import api from './api';
import config from './config.json';
import httpReq from './lib/httpReq';
import constConfig from "./lib/constants";

let app = express();
app.server = http.createServer(app);

// logger
app.use(morgan('dev'));

// 3rd party middleware
app.use(cors({
	exposedHeaders: config.corsHeaders
}));

app.use(bodyParser.json({
	limit : config.bodyLimit
}));

// connect to db
initializeDb( db => {

    let constants = constConfig({config});
    let url = constants.fetchToken + config.commerceTools.projectKey;
    let headers = {};
    headers.Authorization = 'Basic ' + new Buffer(config.commerceTools.credentials.clientId + ':' + config.commerceTools.credentials.clientSecret).toString("base64");
    
    console.log('access token url... ', url);
    httpReq
        .httpPost(url, null, false, headers, false)
        .then(function(results) {

            config.commerceTools.access_token = results.access_token;

            // internal middleware
            app.use(middleware({ config, db }));
            
            console.info('constants...',constants);
            // api router
            app.use('/api', api({ config, constants }));

            app.server.listen(process.env.PORT || config.port, () => {
                console.log(`Started on port ${app.server.address().port}`);
            });
        });

	
});

export default app;
