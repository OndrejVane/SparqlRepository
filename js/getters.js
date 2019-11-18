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

/**
 * Load value of current query version from local storage
 * and return as number
 *
 * @returns {number} current query version
 */
function getCurrentQueryVersion() {
    let currentVersion = window.localStorage.getItem("currentVersion");
    return parseInt(currentVersion);
}

function getTagsValuesElement() {
    return document.getElementById("tags-values");
}

/**
 *
 * @returns {string[]} array of tags
 */
function getTagsArray() {
    let tagInputElement = getTagsValuesElement();
    if (tagInputElement === null) {
        if (getCurrentQueryId() !== -1) {
            return getCurrentVersionQuery()._tags;
        } else {
            return [];
        }
    } else {
        return getTagsValuesElement().value.split(",");
    }
}

function getSaveButtonElement() {
    return $('#save-btn');
}

function getCardHeader() {
    return document.getElementById('card-header');
}

function getExportButtonElement() {
    return document.getElementById("export-button");
}

function getImportButtonElement() {
    return document.getElementById('import-button');
}

function getIdFromLs() {
    return window.localStorage.getItem(id);
}