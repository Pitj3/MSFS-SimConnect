var path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: ["./src/index.js"],
	target: "web",
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "main.bundle.js",
		chunkFilename: '[name].bundle.js',
		publicPath: ""
	},
	performance: {
		maxEntrypointSize: 4096000,
		maxAssetSize: 4096000
	},
	devServer: {
		historyApiFallback: true,
		port: 8080,
		hot: true,
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json", ".png", ".jpg"]
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					emitFile: false
				},
			},

			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				exclude: [/build/, /node_modules/],
				loader: "awesome-typescript-loader",
				options: {
					useCache: false
				}
			},
			{
				test: /\.js$/,
				exclude: [/node_modules/, /build/],
				use: {
					loader: "babel-loader"
				}
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

			{
				// Do not transform vendor's CSS with CSS-modules
				// The point is that they remain in global scope.
				// Since we require these CSS files in our JS or CSS files,
				// they will be a part of our compilation either way.
				// So, no need for ExtractTextPlugin here.
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
			},
			{
				// Do not transform vendor's CSS with CSS-modules
				// The point is that they remain in global scope.
				// Since we require these CSS files in our JS or CSS files,
				// they will be a part of our compilation either way.
				// So, no need for ExtractTextPlugin here.
				test: /\.less$/,
				use: [{
					loader: 'style-loader' // creates style nodes from JS strings
				  }, {
					loader: 'css-loader' // translates CSS into CommonJS
				  }, {
					loader: 'less-loader' // compiles Less to CSS
				  }]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader',
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
			}, {
				test: /\.json$/,
				loader: 'json-loader',
			}, {
				test: /\.(mp4|webm|mp3)$/,
				loader: 'url-loader',
				query: {
					limit: 10000,
				},
			},
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		}),
	],
	stats: {
		colors: true
	},

	//devtool: "source-map",

	// When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
		app: "app"
    }
};
