
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

/**
 * Load value of current query id from local storage
 * and return as number.
 *
 * @returns {number} current query id
 */
function getCurrentQueryId() {
    let currentIdText = window.localStorage.getItem(currentId);
    return parseInt(currentIdText);
}
