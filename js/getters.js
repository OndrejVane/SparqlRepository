
function getEndPointUrlField() {
    return document.getElementById("endpoint-input");
}
function getEndPointUrl() {
    return getEndPointUrlField().value;
}

function getQueryNameField() {
    return document.getElementById("query-name");
}

function getQueryName() {
    return getQueryNameField().value;
}

function getQueryDescriptionField() {
    return document.getElementById("query-description");
}

function getQueryDescription() {
    return getQueryDescriptionField().value;
}

function getSparqlQueryField() {
    return document.getElementById("sparql-query");
}

function getSparqlQuery() {
    return getSparqlQueryField().value;
}

function getToastMessage() {
    return document.getElementById("toast-message");
}
