const path = require('path');

const OUTPUT_DIR = 'dist';
const USE_SOURCE_MAPS = true;
const OUTPUT_BASENAME = 'bundle';
const ENTRY_POINT = 'index.jsx'
const RESOLVE_EXTENSIONS = ['.js', '.jsx', '.scss', '.css', '.json'];
const MODULE_DIRS = [
  path.resolve(__dirname, '../node_modules')
];

module.exports = {
	entry: [ path.join(__dirname, ENTRY_POINT) ],
	devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, OUTPUT_DIR),
		filename: `${OUTPUT_BASENAME}.js`,
		publicPath: OUTPUT_DIR
	},
	devServer: {
    historyApiFallback: { index: 'index.html' }
  },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [ { loader: 'babel-loader' } ]
			},
			{
				test: /\.scss$/,
				exclude: /bower_components/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [ { loader: 'file-loader' } ]
			},
			{
			  test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
			  test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
			  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
			},
			{
			  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'file-loader'
			},
			{
			  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
			}
		]
	},
	resolve: {
		modules: MODULE_DIRS,
		extensions: RESOLVE_EXTENSIONS,
		descriptionFiles: ['package.json']
	}
};
