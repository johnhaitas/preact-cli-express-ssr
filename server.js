const express = require('express'),
	compression = require('compression'),
	{ readFileSync } = require('fs'),
	{ addHandlers } = require('./build/ssr-build/ssr-bundle'),
	template = readFileSync(__dirname + '/build/index.html', 'utf8');

const port = process.env.PORT || 8080;

const notFoundHandler = (req, res) => {
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

addHandlers(app, template);

app.get('*', notFoundHandler);

const server = app.listen(port, () => {
	console.log(`Server is available at http://localhost:${port}`);  // eslint-disable-line no-console
});

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'],
	generateSigHandler = sigName => () => {
		console.info(`${sigName} signal received.`);  // eslint-disable-line no-console
		console.log('Closing http server.');  // eslint-disable-line no-console
		server.close(() => {
			console.log('Http server closed.');  // eslint-disable-line no-console
		});
	};
signals.forEach(sigName => process.once(sigName, generateSigHandler(sigName)));
