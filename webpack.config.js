const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

//Exclude node_module stuffs
let nodeModules = {};
fs.readdirSync('node_modules')
	.filter(function(x) {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach(function(mod) {
		nodeModules[mod] = 'commonjs ' + mod;
	});

module.exports = {
	entry: './src/index.js',
	target: 'node',
	output: {
		path: path.join(__dirname, 'service'),
		libraryTarget: "commonjs2",
		filename: 'src.js'
	},
	module: {
		rules: [{
			test: /\.js?$/,
			loaders: ['babel-loader'],
		}],
	},
	externals: nodeModules,
};