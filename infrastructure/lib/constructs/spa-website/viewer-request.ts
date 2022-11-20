//@ts-ignore
// This file should be written in pure javascript and ES5 Compliant only
// @see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/functions-javascript-runtime-features.html
function handler(event) {
    var request = event.request;
    console.log(request);
    var host = request.headers.host.value;
    var wwwPrefix = "www.";

    if (host.startsWith(wwwPrefix)) {
        console.log("Redirecting...");
        var response = {
            statusCode: 301,
            statusDescription: 'Redirect To Apex Domain Name',
            headers: {
                'location': { "value": `https://${host.slice(wwwPrefix.length)}${request.uri}` }
            }
        };
        return response;
    }
    return request;
}