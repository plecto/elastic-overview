var webpack = require('webpack');
var path = require('path');


module.exports = {
	entry: "./src/index.jsx",
	output: {
		path: process.env.NODE_ENV === 'production' ? './dist' : './dev',
		filename: "elastic-overview.js"
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("production")
			}
		}),
		// new webpack.optimize.UglifyJsPlugin({ output: {comments: false} }),
		new webpack.BannerPlugin('Plecto ApS (www.plecto.com)')
	],
	module: {
		loaders: [
			{ test: /jquery\.js$/, loader: 'expose?$' },
			{ test: /jquery\.js$/, loader: 'expose?jQuery' },
			{ test: /\.less/, loader: 'style-loader!css-loader!less-loader' },
			{ test: /\.json$/, loader: 'json-loader' },
			{ test: /\.jsx$/, loader: 'jsx-loader' },
			{ test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}  // inline base64 URLs for <=8k resources, direct URLs for the rest
		]
	}
};
