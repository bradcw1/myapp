const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query:
				{
					presets:['@babel/react']
				}
				
			},
			{
				test: /\.(sass|scss)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				     ]
			}
			]
	},

	plugins: [new UglifyJSPlugin()],
	entry: {
		index: './src/index.js',
		style: './src/style.scss',
		localstorage: './src/localstorage.js'
	       },
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'public/javascripts')
	},
	mode: 'production',
	watchOptions: {
		ignored: /node_modules/,
		poll: 1000
	}
};
