const path = require('path');

var SRC_DIR = path.join(__dirname, '/client/src');
var PUBLIC_DIR = path.join(__dirname, '/client/public');

module.exports = {
	entry: `${SRC_DIR}/index.jsx`,
	output: {
		filename: 'bundle.js',
		path: PUBLIC_DIR
	},
	module: {
		rules: [
		{
			test: /\.jsx?$/,
			include: SRC_DIR,
			loader: "babel-loader",
			query: {
          presets: ["es2015",'react']
        },
		}
		]
	}
}