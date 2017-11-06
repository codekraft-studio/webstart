'use strict';

const fs = require('fs')
const path = require('path')
const http = require('http')
const finalhandler = require('finalhandler')
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const serveStatic = require('serve-static')
const ReportGenerator = require('lighthouse/lighthouse-core/report/v2/report-generator');

const hostname = 'localhost';
const port = 10000;
const flags = {};
const config = null;

// Serve up dist folder
const serve = serveStatic('dist', {'index': ['index.html']})

// Create server
const server = http.createServer(function onRequest (req, res) {
  serve(req, res, finalhandler(req, res))
})

// Launch chrome than start lighthouse reports on given url
function launchChromeAndRunLighthouse(url, flags = {}, config = null) {
	return chromeLauncher.launch().then(chrome => {
		flags.port = chrome.port;
		return lighthouse(url, flags, config).then(results => chrome.kill().then(() => results));
	});
}

// Listen
server.listen(port, () => {

	// Start chrome and do reports
	launchChromeAndRunLighthouse(`http://${hostname}:${port}`, flags).then(results => {
		// Create the report html
		const html = new ReportGenerator().generateReportHtml(results);
		const outputPath = path.join(__dirname, '../output');
		// Ensure output folder exists
		if(!fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath);
		}
		fs.writeFileSync(`${outputPath}/index.html`, html);
		server.close();
	});
});
