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
        setQueryInputsEditable();
        return;
    }
    setQueryInputsNonEditable();

    log("Query id to render: " + currentQuery._id);
    log(currentQuery);

    getQueryNameField().value = currentQuery._name;
    getQueryDescriptionField().value = currentQuery._desc;
    getEndPointUrlField().value = currentQuery._endpoint;
    getSparqlQueryField().value = currentQuery._body;

    let tagList = $('#tag-list');
    // reset previous tag list
    tagList.empty();

    let tags = currentQuery._tags;
    for (let i = 0; i < tags.length; i++) {
        let tagName = tags[i];
        tagList.append(buildTagForContent(tagName));
    }
}
