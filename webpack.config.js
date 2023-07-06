const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		popup: path.resolve('./src/popup.tsx')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		clean: true,
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.scss'],
	},
	devServer: {
		static: './dist'
	},
	optimization: {
		runtimeChunk: true,
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/i,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react']
					}
				}
			},
			{
				test: /\.scss$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/popup.html',
			filename: 'popup.html'
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve('public'),
					to: path.resolve('dist')
				}
			]
		})
	]
};