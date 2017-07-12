var wpk = require('webpack');
var nPath = require('path');
var HtmlWpkPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var WriteFilePlugin = require("write-file-webpack-plugin");
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ngToolsWebpack = require('@ngtools/webpack');
var wpkMerge = require('webpack-merge');
var CompressionPlugin = require('compression-webpack-plugin');

var pathsToClean = [
	'dist',
	'build'
]

// the clean options to use
var cleanOptions = {
	root: '/full/webpack/root/path',
	exclude: ['shared.js'],
	verbose: true,
	dry: false
}

var srcApp = './src/', distApp = 'dist/';

var npmLifecycle = process.env.npm_lifecycle_event;
console.log('29 -- npmLifecycle (package.json each scripts name) is: ', npmLifecycle);

var appEnvironment = process.env.APP_ENVIRONMENT || 'development';
var isProductionBool = appEnvironment === 'production';

var commonConfig = {
	// for production, you should comment [devtool: 'eval-source-map'] out.
	devtool: 'eval-source-map',
	entry: {
		'a4starterApp': [srcApp + 'main.ts'],
		'polyfills': [
			'core-js/es6/reflect',
			'core-js/es7/reflect',
			'zone.js/dist/zone'
		]
	},
	output: {
		// path: __dirname,
		path: nPath.resolve(__dirname, distApp),
		filename: 'js/[name]_[hash:9].js',
		pathinfo: true
	},
	module: {
		loaders: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: '@ngtools/webpack'
				// loader: isProductionBool? '@ngtools/webpack': ['ts-loader', 'angular2-template-loader']
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loader: 'raw-loader'
			},
			{
				test: /\.css$/,
				include: nPath.resolve('src/app'),
				loader: 'raw-loader'
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.html', '.css', '.scss', '.less']
	},
	plugins: [
		new wpk.ContextReplacementPlugin(
			/angular(\\|\/)core(\\|\/)@angular/,
			nPath.resolve(__dirname, 'src')
		),
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new CopyWebpackPlugin([
			{ from: srcApp + 'images', to: 'imgs' }
		]),
		new HtmlWpkPlugin({
			template: srcApp + 'index.html',
			filename: './index.html',
			minify: {
				caseSensitive: true,
				collapseInlineTagWhitespace: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				removeComments: true,
				removeEmptyAttributes: true,
				removeEmptyElements: true
			},
			hash: true
		}),
		new wpk.DefinePlugin({
			app: {
				environment: JSON.stringify(appEnvironment)
			}
		}),
		new wpk.optimize.CommonsChunkPlugin({
			name: 'polyfills',
			children: true,
			async: true
		}),
		new ngToolsWebpack.AotPlugin({
			tsConfigPath: './tsconfig-aot.json',
			entryModule: nPath.resolve(__dirname, 'src/app/app.module#AppModule')
		}),
		new ExtractTextPlugin('mincss/[name].css'),
		new UglifyJSPlugin({
			sourceMap: true,
			comments: false,
			compress: {
				warnings: true,
				drop_console: true
			},
			minimize: true,
			mangle: {
				// Skip mangling these
				except: ['$super', '$', 'exports', 'require'],
				keep_fnames: true
			},
			output: {
				comments: false
			}
		}),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
			test: /\.js$|\.css$|\.html$/,
			threshold: 9728,
			minRatio: 0.8
		})
	]
};

// if (isProductionBool) {
//     commonConfig.plugins.push(new ngToolsWebpack.AotPlugin({
//         tsConfigPath: './tsconfig.json',
//         entryModule: './src/app/app.module#AppModule'
//     }));
// }

var wpkConfig = {};

// Detect how npm is run and branch based on that
switch (npmLifecycle) {
	case 'wpkservesass':
		var sassConfig = require('./wpk_configs/config_scss');
		wpkConfig = wpkMerge(commonConfig, sassConfig);
		break;
	case 'wpkserveless':
		var lessConfig = require('./wpk_configs/config_less');
		wpkConfig = wpkMerge(commonConfig, lessConfig);
		break;
	case 'build:prod':
		var sassConfig = require('./wpk_configs/config_scss');
		wpkConfig = wpkMerge(commonConfig, sassConfig);
		break;
	default:
		wpkConfig = wpkMerge(commonConfig, {});
}

module.exports = wpkConfig;