var webpack = require("webpack");
var path = require("path");

var ExtractTextPlugin = require("extract-text-webpack-plugin");

//获取多入口打包的文件
var glob = require("glob");//需要安装glob依赖
var entries = function(){
	var jsDir = __dirname + "/public/src/components/";
	var entryFiles = glob.sync(jsDir + '/*/*.{js,jsx}');
	var map = {};
	for(var i=0;i<entryFiles.length;i++){
		var filePath = entryFiles[i];
		var fileName = filePath.substring(filePath.lastIndexOf('\/') + 1,filePath.lastIndexOf('.'));
		map[fileName] = filePath;
	}
	return map;
}
entries();

module.exports = {
	context: path.join(__dirname),
	entry:entries(),
	module: {
		rules: [
			{
		      	test: /\.js$/,
		      	exclude: /(node_modules)/,
		      	use: "babel-loader"
		    },{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
		          	fallback: 'style-loader',
		          	use: ['css-loader', 'less-loader']
		       })
		    }
	    ]
	},
	plugins:[
		new ExtractTextPlugin('./css/antd.css')
	],
	output: {
		path: __dirname + "/public/dist/", //如果需要静态资源再把这个打开
		filename: "js/[name].js"
	}
}