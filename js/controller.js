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

    if(isURL(urlEndPoint)) {
        sendQuery(testQuery, urlEndPoint, checkResponse);
    } else {
        setUrlEndpointButtonOnError();
    }
}

window.onload = function() {
    log("Page onLoad");
    init();
    log("Page after init");
    showAllQueries();
    log("Queries loaded");
};

/**
 * Function which is called after click on close icon.
 *
 * @param {number} id
 */
function deleteQueryWithId(id) {
    if (confirm(DELETE_QUESTION)) {
        // TODO kontrola, jestli není zobrazen mazaný dotaz, pokud ano, všechny pole smazat a nastavit na non editable
        log("Deleting query with id: " + id);
        deleteQueryById(id);
        removeQueryFromViewById(id);
    }
}



