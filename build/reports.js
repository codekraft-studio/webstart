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
const config = {
	extends: 'lighthouse:default',
	settings: {
		onlyCategories: ['performance', 'best-practices', 'accessibility']
	}
};

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

function emptyDir(dir) {
	try { var files = fs.readdirSync(dir); }
	catch(e) {
		console.log(e);
		return;
	}
	if (files.length > 0) {
		for (var i = 0; i < files.length; i++) {
			var filePath = dir + '/' + files[i];
			if (fs.statSync(filePath).isFile()) {
				fs.unlinkSync(filePath);
			} else {
				rmDir(filePath);
			}
		}
	}
}

// Listen
server.listen(port, () => {

	console.log('Started testing http server.');

	// Start chrome and do reports
	launchChromeAndRunLighthouse(`http://${hostname}:${port}`, flags, config).then(results => {
		// Create the report html
		const html = new ReportGenerator().generateReportHtml(results);
		const outputPath = path.join(__dirname, '../output');

		// Ensure output folder exists
		if(!fs.existsSync(outputPath)) {
			fs.mkdirSync(outputPath);
		}

		console.log('Closing testing http server.');
		server.close();

		console.log('Writing results to output folder.');
		// Write both json and generated html
		fs.writeFileSync(`${outputPath}/report.json`, JSON.stringify(results, null, 2));
		fs.writeFileSync(`${outputPath}/index.html`, html);
	});
});
