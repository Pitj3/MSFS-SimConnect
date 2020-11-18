const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	mode: 'production',
	// devtool: 'eval-source-map',
	optimization: {
		sideEffects: false,
	},
	plugins: [
		//new BundleAnalyzerPlugin(),
		new webpack.DefinePlugin({
			'DEBUG': false
		}),
	],
});
