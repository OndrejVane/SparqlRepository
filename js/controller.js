function searchQuery() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("searchBox");
    filter = input.value.toUpperCase();
    ul = document.getElementById("query-list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

function checkEndpointUrl() {
    var urlEndPoint = getEndPointUrl();

    if (isURL(urlEndPoint)) {
        sendQuery(testQuery, urlEndPoint, checkResponse);
    } else {
        setUrlEndpointButtonOnError();
    }
}

window.onload = function () {
    log("Page onLoad");
    init();
    log("Page after init");
    showAllQueries();
    log("Queries loaded");
    renderCurrentQuery();
    log("Current query rendered");
};

/**
 * Function which is called after click on close icon.
 *
 * @param {number} id
 */
function deleteQueryWithId(id) {
    if (confirm(DELETE_QUESTION)) {
        if (id === getCurrentQueryId()) {
            setFormClearForNewQuery();
            log("Current query deleted");
        }
        log("Deleting query with id: " + id);
        deleteQueryById(id);
        removeQueryFromViewById(id);
        showToast(DELETE_SUCCESS);
    }
}

/**
 * This function will render query with id to
 * the form.
 *
 * @param {number} id
 */
function showQueryWithId(id) {
    setCurrentQueryId(id);
    renderCurrentQuery();
}

function saveNewQuery() {
    let newQuery = addNewQuery();
    showSingleQuery(newQuery);
    showToast(SAVED_SUCCESS);
    log("Current query to set is: " + newQuery._id);
    setCurrentQueryId(newQuery._id);
    setCurrentVersion(newQuery._version);
    setViewMode();
}

function saveNewVersionOfQuery() {
    addNewVersion();
    let currentQuery = getCurrentQuery();
    removeQueryFromViewById(currentQuery._id);
    showSingleQuery(currentQuery);
    setCurrentVersion(currentQuery._version);
    setViewMode();
    showToast(SAVED_VERSION_SUCCESS);
}

function onQueryChange() {
    // check if is edit mode
    if (getCardHeader().innerHTML === CARD_HEADER_EDIT) {
        setSaveButtonEnable();
    }
}





