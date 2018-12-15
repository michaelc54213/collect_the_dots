const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
 

module.exports = {

	plugins: [
	
		new BrowserSyncPlugin({

		host: 'localhost',

		port: 3000,
	
		server: { baseDir: ['public'] }

	})

	]

}
