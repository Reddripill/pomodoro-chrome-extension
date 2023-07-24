const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		popup: path.resolve('./src/scripts/popup.tsx'),
		background: path.resolve('./src/scripts/background.ts'),
      offscreen: path.resolve('./src/scripts/offscreen.ts')
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
	watchOptions: {
		ignored: '**/node_modules',
	 },
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
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve('public'),
					to: path.resolve('dist')
				}
			]
		}),
		...getHtmlPlugins(['popup', 'offscreen'])
	]
};

function getHtmlPlugins(chunks) {
	return chunks.map(chunk => {
      return new HtmlWebpackPlugin({
         title: 'Chrome Extension',
         chunks: [chunk],
         filename: `${chunk}.html`,
         template: `./src/html/${chunk}.html`
      })
   })
}