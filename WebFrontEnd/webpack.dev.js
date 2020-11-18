const merge = require('webpack-merge');
const common = require('./webpack.common.js');
var webpack = require('webpack');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		//new BundleAnalyzerPlugin(),
		new webpack.DefinePlugin({
			'DEBUG': true
		}),
	],
});
