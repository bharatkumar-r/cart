import axios from 'axios';
import axiosCancel from 'axios-cancel';

/**
 * HttpRequest util class for call the rest services
 * @module util/HttpRequesst
 */

let axiosConfigWithOutProxy = {
	timeout: 30000,
	headers: {'Content-Type': 'application/json; charset=utf-8'}
};

let axiosConfigWithProxy = {
	timeout: 30000,
	headers: {'Content-Type': 'application/json; charset=utf-8'},
	proxy: {
		host: '172.28.97.25',
		port: 8080,
	}
};

axiosCancel(axios, {
	debug: false // default
});

const httpGet = (url, params, enableProxy, requestheaders, cacheConfig)=>{
	let config = enableProxy ? JSON.parse(JSON.stringify(axiosConfigWithProxy)) : 
		JSON.parse(JSON.stringify(axiosConfigWithOutProxy));
	if(requestheaders !== undefined && requestheaders !=='') {
		config.headers = requestheaders;
	}
	if(config){
		delete config.requestId;
	}
	if(params){
		if(params.cancelToken){
			config.requestId = params.cancelToken;
			delete params.cancelToken;
		}
		if(params.timeout){
			config.timeout = params.timeout;
			delete params.timeout;
		}
	}
	config = Object.assign({}, config, params, cacheConfig);
	return axios.get(url, config).then((response)=>{
		return response;
	}).catch((error)=>{
		if (error.response) {
			return ({'error': true, 'message': 'Service response error, Please try again later.', 
				'type': 'ERROR', 'code': 1002});
		} else if (error.request) {
			return ({'error': true, 'message': 'Service invalid request error, Please try again later.', 
				'type': 'ERROR', 'code': 1003});
		} else if(error.message.indexOf('timeout of') > -1 && error.message.indexOf('exceeded') > -1){
			return ({'error': true, 'message': 'Service timeout error, Please try again later.', 
				'type': 'ERROR', 'code': 1004});
		} else if(error.message.indexOf('cancelRequest') > -1){
			return ({'error': true, 'message': 'Service request canceled, Please try again later.', 
				'type': 'ERROR', 'code': 1001});
		}else{
			return ({'error': true, 'message': 'Service failure, Please try again later.', 
				'type': 'ERROR', 'code': 1000});
		}
	});
};

const httpPost = (url, params, enableProxy, requestheaders, cacheConfig)=>{
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	let config = enableProxy ? JSON.parse(JSON.stringify(axiosConfigWithProxy)) : 
		JSON.parse(JSON.stringify(axiosConfigWithOutProxy));
	if(requestheaders !== undefined  && requestheaders !=='') {
		config.headers = requestheaders;
	}
	if(config){
		delete config.requestId;
	}
	if(params){
		if(params.cancelToken){
			config.requestId = params.cancelToken;
			delete params.cancelToken;
		}
		if(params.timeout){
			config.timeout = params.timeout;
			delete params.timeout;
		}
	}
	config = Object.assign({}, config, cacheConfig);
	let reqParams = JSON.stringify(params)
	
	return axios.post(url, reqParams, config).then((response)=>{
		return response.data;
	}).catch((error)=>{
		if (error.response) {
			return ({'error': true, 'message': 'Service response error, Please try again later.', 
				'type': 'ERROR', 'code': 1002});
		} else if (error.request) {
			return ({'error': true, 'message': 'Service invalid request error, Please try again later.', 
				'type': 'ERROR', 'code': 1003});
		} else if(error.message.indexOf('timeout of') > -1 && error.message.indexOf('exceeded') > -1){
			return ({'error': true, 'message': 'Service timeout error, Please try again later.', 
				'type': 'ERROR', 'code': 1004});
		} else if(error.message.indexOf('cancelRequest') > -1){
			return ({'error': true, 'message': 'Service request canceled, Please try again later.', 
				'type': 'ERROR', 'code': 1001});
		}else{
			return ({'error': true, 'message': 'Service failure, Please try again later.', 
				'type': 'ERROR', 'code': 1000});
		}
	});
};

const httpPut = (url, params, enableProxy, requestheaders)=>{
	let config = enableProxy ? JSON.parse(JSON.stringify(axiosConfigWithProxy)) : 
		JSON.parse(JSON.stringify(axiosConfigWithOutProxy));
	if(requestheaders !== undefined) {
		config.headers = requestheaders;
	}
	if(config){
		delete config.requestId;
	}
	if(params){
		if(params.cancelToken){
			config.requestId = params.cancelToken;
			delete params.cancelToken;
		}
		if(params.timeout){
			config.timeout = params.timeout;
			delete params.timeout;
		}
	}
	let reqParams = JSON.stringify(params)
	return axios.put(url, reqParams, config).then((response)=>{
		return response;
	}).catch((error)=>{
		if (error.response) {
			return ({'error': true, 'message': 'Service response error, Please try again later.', 
				'type': 'ERROR', 'code': 1002});
		} else if (error.request) {
			return ({'error': true, 'message': 'Service invalid request error, Please try again later.', 
				'type': 'ERROR', 'code': 1003});
		} else if(error.message.indexOf('timeout of') > -1 && error.message.indexOf('exceeded') > -1){
			return ({'error': true, 'message': 'Service timeout error, Please try again later.', 
				'type': 'ERROR', 'code': 1004});
		} else if(error.message.indexOf('cancelRequest') > -1){
			return ({'error': true, 'message': 'Service request canceled, Please try again later.', 
				'type': 'ERROR', 'code': 1001});
		}else{
			return ({'error': true, 'message': 'Service failure, Please try again later.', 
				'type': 'ERROR', 'code': 1000});
		}
	});
};

const httpDelete = (url, params, enableProxy, requestheaders)=>{
	let config = enableProxy ? JSON.parse(JSON.stringify(axiosConfigWithProxy)) : 
		JSON.parse(JSON.stringify(axiosConfigWithOutProxy));
	config = enableProxy ? Object.assign({}, params, config) : params;
	if(requestheaders !== undefined) {
		config.headers = requestheaders;
	}
	if(config){
		delete config.requestId;
	}
	config = Object.assign({}, config, params);
	return axios.delete(url, config).then((response)=>{
		return response;
	}).catch((error)=>{
		if (error.response) {
			return ({'error': true, 'message': 'Service response error, Please try again later.', 
				'type': 'ERROR', 'code': 1002});
		} else if (error.request) {
			return ({'error': true, 'message': 'Service invalid request error, Please try again later.', 
				'type': 'ERROR', 'code': 1003});
		} else if(error.message.indexOf('timeout of') > -1 && error.message.indexOf('exceeded') > -1){
			return ({'error': true, 'message': 'Service timeout error, Please try again later.', 
				'type': 'ERROR', 'code': 1004});
		} else if(error.message.indexOf('cancelRequest') > -1){
			return ({'error': true, 'message': 'Service request canceled, Please try again later.', 
				'type': 'ERROR', 'code': 1001});
		}else{
			return ({'error': true, 'message': 'Service failure, Please try again later.', 
				'type': 'ERROR', 'code': 1000});
		}
	});
};

const httpStream = (url)=>{
	return axios({
  		method:'get',
  		url:url,
  		responseType:'stream'
	}).then(function(response) {
		return response;
	}).catch((error)=>{
		return {'error': error};
	});
};

const cancelAPICall = (token)=>{
	if(token){
		if(token === 'all'){
			axios.cancelAll();
		}else if(token.search(',')>-1){
			token = token.split(',');
			token.forEach((reqId) => {
				axios.cancel(reqId);
			});
		}else{
			axios.cancel(token);
		}
	}
};

exports.httpPost = httpPost;
exports.httpGet = httpGet;
exports.httpPut = httpPut;
exports.httpDelete = httpDelete;
exports.httpStream = httpStream;
exports.cancelAPICall = cancelAPICall;
