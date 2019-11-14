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

function setEditMode() {
    setQueryInputsEditable();
    setSaveButtonEnable();
    addTitleToTheCardHeader(CARD_HEADER_EDIT);
}

function setQueryInputsNonEditable() {
    getQueryNameField().readOnly = true;
    getQueryDescriptionField().readOnly = true;
    getEndPointUrlField().readOnly = true;
    getSparqlQueryField().readOnly = true;
    setTagsEditable(false);
}

function setFormClearForNewQuery() {
    setCurrentQueryId(-1);
    setQueryInputsEditable();
    getQueryNameField().value = "";
    getQueryDescriptionField().value = "";
    getEndPointUrlField().value = "";
    getSparqlQueryField().value = "";
    setEditButtonDisabled();
    setSaveButtonDisabled();
    addTitleToTheCardHeader(CARD_HEADER_NEW);
}

function showAllQueries() {

    let queries = getAllQueries();

    log("All queries: " + queries);

    for (let i = 0; i < queries.length; i++) {
        let result = buildSideBarItem(queries[i]);
        $('#query-list').append(result);
    }
}

function showSingleQuery(query) {
    let result = buildSideBarItem(query);
    $('#query-list').append(result);
}

/**
 * Function for showing toast message
 * @param {string} message
 */
function showToast(message) {
    let x = getToastMessage();
    x.className = "show";
    x.innerHTML = message;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function removeQueryFromViewById(id) {
    let queryId = "#query" + id;
    $(queryId).empty();
}

function renderCurrentQuery() {
    let currentQuery = getCurrentQuery();
    if ( currentQuery === null ){
        setFormClearForNewQuery();
        return;
    }
    setQueryInputsNonEditable();
    setEditButtonEnable();
    setSaveButtonDisabled();
    addTitleToTheCardHeader(CARD_HEADER_VIEW);
    log("Query id to render: " + currentQuery._id);
    log(currentQuery);

    getQueryNameField().value = currentQuery._name;
    getQueryDescriptionField().value = currentQuery._desc;
    getEndPointUrlField().value = currentQuery._endpoint;
    getSparqlQueryField().value = currentQuery._body;

    renderTagsForCurrentQuery(currentQuery._tags);

}

function renderTagsForCurrentQuery(tags) {
    let tagList = $('#tag-list');
    // reset previous tag list
    tagList.empty();

    for (let i = 0; i < tags.length; i++) {
        let tagName = tags[i];
        tagList.append(buildTagForContent(tagName));
    }
}

function setSaveButtonDisabled() {
    $('#save-btn').addClass("disabled");
}

function setEditButtonDisabled() {
    $('#edit-btn').addClass("disabled");
}

function setPrevButtonDisabled() {
    $('#prev-btn').addClass("disabled");
}

function setNextButtonDisable() {
    $('#next-btn').addClass("disabled");
}

function setSaveButtonEnable() {
    $('#save-btn').removeClass("disabled");
}

function setEditButtonEnable() {
    $('#edit-btn').removeClass("disabled");
}

function setPrevButtonEnable() {
    $('#prev-btn').removeClass("disabled");
}

function setNextButtonEnable() {
    $('#next-btn').removeClass("disabled");
}

function addTitleToTheCardHeader(message) {
    getCardHeader().innerHTML = message;
}
