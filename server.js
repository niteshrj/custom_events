var http = require("http");
var pendingResponse;
var chunks = "";

http.createServer(function(request, response) {
	// if we have data, send it
	if (chunks.length) {
		response.writeHead(200, { "Content-Type": "text/plain" });
		response.end(chunks);
		chunks = "";

	// no data sitting around, store the response for later
	} else {
		pendingResponse = response;
	}
}).listen(8000);

process.openStdin().addListener("data", function(chunk) {
	// if we have a pending request, send the data
	if (pendingResponse) {
		pendingResponse.writeHead(200, { "Content-Type": "text/plain" });
		pendingResponse.end(chunk);
		pendingResponse = null;

	// no pending request, store the chunk from stdin for later
	} else {
		chunks += chunk;
	}
});
