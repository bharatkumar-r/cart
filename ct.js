import { createClient } from '@commercetools/sdk-client'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createRequestBuilder } from '@commercetools/api-request-builder';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createSyncCategories } from '@commercetools/sync-actions';
import fetch from 'node-fetch';

const client = createClient({
    middlewares: [
        createAuthMiddlewareForClientCredentialsFlow({
            host: 'https://auth.commercetools.co',
            projectKey: 'ecomstore',
            credentials: {
                clientId: 'NYf6YcA6GVc7DR8ibLBQCQmJ',
                clientSecret: '3mNdQ3iLalxnTjCPfRhrhLMTWb-5Jao5',
            },
            scopes: ['manage_project:ecomstore'],

            // Optional if not globally available
            function (url, headers) {
                fetch(url, headers)
                .then(res => res.json())
                .then(json => {
                    console.log('########## json',json)
                });
            }
        }),
        createHttpMiddleware({
            host: 'https://api.commercetools.co',
            includeResponseHeaders: true,
            includeOriginalRequest: true,
            maskSensitiveHeaderData: true,
            enableRetry: true,
            retryConfig: {
              maxRetries: 2,
              retryDelay: 300, //milliseconds
              maxDelay: 5000, //milliseconds
            },
      
            // Optional if not globally available
            fetch,
          }),
    ],
})

const requestBuilder = createRequestBuilder({ projectKey: 'ecomstore' })
const productProjectionsService = requestBuilder.productProjections

const uri = productProjectionsService
    .build();


    console.info('uri.......',uri);
    console.info('client.......',client);
const productsRequest = {
        uri: uri,
        method: 'GET',
      }
// 1. We want to publish all products that are not published yet
client.execute(productsRequest).then(response => {
    let resBody = response.body;
    // console.info('response...',response);
    // console.info('resBody...., ', resBody);
    // console.info('response...',response.headers);
});

const syncCategories = createSyncCategories();
const before = {
    name: { en: 'Foods' }
  }
  const now = {
    name: { en: 'Foods', de: 'Lebensmittel' }
  }
  const actions = syncCategories.buildActions(now, before)
  console.log('actions........',actions);