const express = require('express'),
	compression = require('compression'),
	{ readFileSync } = require('fs'),
	{ addHandlers } = require('./build/ssr-build/ssr-bundle');

const port = process.env.PORT || 8080,
	baseState = {};

const template = readFileSync(__dirname + '/build/index.html', 'utf8');
	
const respondStatusOK = (req, res) => res.status(200).send('ok'),
	notFoundHandler = (req, res) => {
		res.setHeader('Content-Type', 'text/plain');
		res.status(404).send('Not Found');
	},
	requestLogger = (req, res, next) => {
		const startTime = Date.now(),
			{ method, url } = req;
		res.on('finish', () => console.log(`${res.statusCode} ${method} ${url} ${Date.now() - startTime}ms`)); // eslint-disable-line no-console
		next();
	};
	
const app = express();
app.disable('x-powered-by');

/* Health Check */
app.get('/_health/shallow', respondStatusOK);
app.use(requestLogger);

app.get('/ssr-build/*', notFoundHandler);
app.use(compression());
app.use(express.static(__dirname + '/build', {
	maxage: '7d',
	index: false,
	setHeaders: (res, _) => {
		if (res.req.path === '/sw.js') {
		  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
		}
	  }
}));

addHandlers(app, template, baseState);

app.get('*', notFoundHandler);

app.listen(port, () => {
	console.log(`Server with is running on port http://localhost:${port}`);  // eslint-disable-line no-console
});
