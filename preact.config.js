import CompressionPlugin from 'compression-webpack-plugin';
import asyncPlugin from 'preact-cli-plugin-fast-async';

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {object} env - options passed to CLI.
 * @param {WebpackConfigHelpers} helpers - object with useful helpers when working with config.
 **/
export default function (config, env, helpers) {

	if (env.production !== true) {
		helpers.getPluginsByName(config, 'UglifyJsPlugin')
			.map(e => e.index)
			.forEach(index => {
				config.plugins.splice(index, 1);
			});
	}
	
	if (env.ssr) {
		config.entry['ssr-bundle'] = env.source('./server/index.js');
		config.output.filename = '[name].js';
	}

	asyncPlugin(config);

	config.plugins.push(new CompressionPlugin({
		asset: '[path].gz[query]',
		algorithm: 'gzip',
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0.8
	}));
}