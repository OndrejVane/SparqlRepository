/**
 * Send Query to server via AJAX.
 */
function sendQuery(queryToSend, endpointUrl, processFunction) {
    $.ajax({
        type: requestMethod,
        async: false,
        url: endpointUrl,
        data:
            {
                query: queryToSend
            },
        success: function (result) {
            const queryResponse = JSON.stringify(result);
            log("Query response: " + queryResponse);
            processFunction(queryResponse, true);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            log("xhr: " + xhr + ", ajaxOptions: " + ajaxOptions, ", thrownError: " + thrownError );
            processFunction(thrownError, false);
        }
    });
}