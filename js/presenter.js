function setUrlEndpointButtonOnSuccess() {
    var urlButton = document.getElementById("endpointButton");
    urlButton.style.backgroundColor = greenColor;
    urlButton.style.color = whiteColor;
}

function setUrlEndpointButtonOnError() {
    var urlButton = document.getElementById("endpointButton");
    urlButton.style.backgroundColor = redColor;
    urlButton.style.color = whiteColor;
}

function setUrlEndpointButtonToOrigin() {
    var urlButton = document.getElementById("endpointButton");
    urlButton.style.backgroundColor = whiteColor;
    urlButton.style.color = greyColor;
}

function setQueryInputsEditable() {
    getQueryNameField().readOnly = false;
    getQueryDescriptionField().readOnly = false;
    getEndPointUrlField().readOnly = false;
    getSparqlQueryField().readOnly = false;
    setTagsEditable(true);

}

function setQueryInputsNonEditable() {
    getQueryNameField().readOnly = true;
    getQueryDescriptionField().readOnly = true;
    getEndPointUrlField().readOnly = true;
    getSparqlQueryField().readOnly = true;
    setTagsEditable(false);
}

function showAllQueries() {

    let queries = getAllQueries();

    for (let i = 0; i < queries.length; i++) {
        let result = buildSideBarItem(queries[i]);
        $('#query-list').append(result);
    }
}