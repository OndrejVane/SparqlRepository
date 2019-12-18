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
    renderQuery(getCurrentQuery());
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
    renderQuery(getCurrentQuery());
    handleNextAndPrevButton();
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

function showPreviousQueryVersion() {
    setViewMode();
    let prevVersionQuery = getPrevVersion();
    log("Prev version: ");
    log(prevVersionQuery);
    if (prevVersionQuery !== null) {
        renderQuery(prevVersionQuery);
    }

    handleNextAndPrevButton();
}

function showNextQueryVersion() {
    setViewMode();
    let nextVersionQuery = getNextVersion();
    log("Next version: ");
    log(nextVersionQuery);
    if (nextVersionQuery !== null) {
        renderQuery(nextVersionQuery);
    }

    handleNextAndPrevButton();
}

function send() {
    let endpoint = getEndPointUrl();
    let query = getSparqlQuery();

    while (checkIfContainsDelimiter(query)) {
        let variable = prompt(DELIMITER_QUESTION,);

        while (variable === null || variable === "") {
            variable = prompt(DELIMITER_QUESTION,);
        }

        query = replaceVariableInQuery(query, variable);
    }

    log("Sent: " + query);
    sendQuery(query, endpoint, printResponse);
}

function exportData(){
    let exportData = createHeaderForExport();
    exportData = exportData + getAllQueriesForExport();

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(exportData));
    element.setAttribute('download', exportFileName);
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    showToast(DATA_EXPORTED);
}

function importData() {
    let element = document.createElement('input');
    element.setAttribute('id', 'file-input');
    element.setAttribute('type', 'file');
    element.style.display = 'none';
    document.body.appendChild(element);
    document.getElementById('file-input').addEventListener('change', readSingleFile, false);
    element.click();
    document.body.removeChild(element);
}

function downloadCSV() {
    if (table) {
        table.download("csv", "data.csv", {delimiter: ";"});
    } else {
        showToast(TABLE_IS_EMPTY);
    }
}

function downloadJSON() {
    if (table) {
        table.download("json", "data.json");
    } else {
        showToast(TABLE_IS_EMPTY);
    }
}

function downloadXLSX() {
    if (table) {
        table.download("xlsx", "data.xlsx", {sheetName: "My Data"});
    } else {
        showToast(TABLE_IS_EMPTY);
    }
}

function downloadPDF() {
    if (table) {
        table.download("pdf", "data.pdf", {
            orientation: "portrait",
            title: "Query result",
        });
    } else {
        showToast(TABLE_IS_EMPTY);
    }
}