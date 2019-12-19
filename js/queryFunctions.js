function init() {
    if (window.localStorage.getItem("id") === null) {
        window.localStorage.setItem("id", 1);
        log("id successfully initialized to value 1");
    }

    if (window.localStorage.getItem("currentId") === null) {
        window.localStorage.setItem("currentId", 0);
        log("currentId successfully initialized to value 0");
    }

    if (window.localStorage.getItem("currentVersion") === null) {
        window.localStorage.setItem("currentVersion", -1);
        log("currentVersionId successfully initialized to value -1");
    }
}

function addNewQuery() {
    var id = window.localStorage.getItem("id");
    incrementId();
    var myQuery = new Query(id, getQueryName(), getQueryDescription(), getEndPointUrl(), getTagsArray(), getSparqlQuery(), 1);
    //var ver = myQuery.version;

    window.localStorage.setItem("query_" + id, JSON.stringify({lastVersion: 1, queries: [myQuery]}));
    return getQueryById(id);
}

function incrementId() {
    var id = window.localStorage.getItem("id");
    id++;
    window.localStorage.setItem("id", id);
}

function addNewVersion() {
    var currId = window.localStorage.getItem("currentId");
    var value = window.localStorage.getItem(currId);

    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);

    var lastVersion = parsed.lastVersion;
    lastVersion++;

    var tmp = currId.split("_");

    arr.push(new Query(tmp[1], getQueryName(), getQueryDescription(), getEndPointUrl(), getTagsArray(), getSparqlQuery(), lastVersion));

    window.localStorage.setItem("query_" + tmp[1], JSON.stringify({lastVersion: lastVersion, queries: arr}));
}

/**
 *
 * @param json
 * @returns {Query[]}
 */
function jsonToArray(json) {
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function (key) {
        result.push(json[key]);
    });
    return result;
}

/**
 *
 * @returns {Query|null}
 */
function getPrevVersion() {
    // sedivé talčítko -> na frontendu ;)

    var currId = window.localStorage.getItem("currentId");
    //var currId = getCurrentQueryId();
    var currVer = window.localStorage.getItem("currentVersion");
    var value = window.localStorage.getItem(currId);
    if (value === null){
        return false;
    }
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var i;
    var minDiff = 10000;
    var minDiffIndex = -1;

    if (arr.length > 1) { //mozna neni treba
        for (i = 0; i < arr.length; i++) {
            var temp = currVer - arr[i]._version;
            if (temp > 0 && temp < minDiff) {
                minDiff = temp;
                minDiffIndex = i;
            }
        }

        if (minDiffIndex == -1) { //mozna neni treba kdyz kontrola na frontendu
            return null;
        } else {
            //window.log(arr[minDiffIndex]);
            setCurrentVersion(arr[minDiffIndex]._version);
            return arr[minDiffIndex];
        }
    } else {
        return null;
    }
}

function hasPrevVersion() {

    var currId = window.localStorage.getItem("currentId");
    //var currId = getCurrentQueryId();
    var currVer = window.localStorage.getItem("currentVersion");
    var value = window.localStorage.getItem(currId);
    if (value === null){
        return false;
    }
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var i;
    var minDiff = 10000;
    var minDiffIndex = -1;

    if (arr.length > 1) {
        for (i = 0; i < arr.length; i++) {
            var temp = currVer - arr[i]._version;
            if (temp > 0 && temp < minDiff) {
                minDiff = temp;
                minDiffIndex = i;
            }
        }

        if (minDiffIndex === -1) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

/**
 *
 * @returns {Query|null}
 */
function getNextVersion() {

    var currId = getCurrentQueryId();
    var currVer = window.localStorage.getItem("currentVersion");
    var value = window.localStorage.getItem("query_" + currId);
    if (value === null){
        return false;
    }
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var i;
    var minDiff = 10000;
    var minDiffIndex = -1;

    if (arr.length > 1) {
        for (i = 0; i < arr.length; i++) {
            var temp = arr[i]._version - currVer;
            if (temp > 0 && temp < minDiff) {
                minDiff = temp;
                minDiffIndex = i;
            }
        }

        if (minDiffIndex == -1) {
            return null;
        } else {
            window.localStorage.setItem("currentVersion", arr[minDiffIndex]._version);
            return arr[minDiffIndex];
        }
    } else {
        return null;
    }
}

function hasNextVersion() {

    var currId = getCurrentQueryId();
    var currVer = window.localStorage.getItem("currentVersion");
    var value = window.localStorage.getItem("query_" + currId);
    if (value === null){
        return false;
    }
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var i;
    var minDiff = 10000;
    var minDiffIndex = -1;

    if (arr.length > 1) {
        for (i = 0; i < arr.length; i++) {
            var temp = arr[i]._version - currVer;
            if (temp > 0 && temp < minDiff) {
                minDiff = temp;
                minDiffIndex = i;
            }
        }

        if (minDiffIndex == -1) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
/**
 *
 * @returns {Query[]}
 */
function getAllQueries() {
    var result = [];
    if (window.localStorage.getItem("id") !== null) {
        var i;
        var len = window.localStorage.length;
        for (i = 0; i < len; i++) {
            var k = window.localStorage.key(i);
            if (k != "id" && k != "currentId" && k != "currentVersion") { //upravit pokud pridame globalni promennou
                //result.push(getQueryById(k));
                var tmp = k.split("_");
                if (tmp[0] = "query"){
                    result.push(getQueryById(tmp[1]));
                }
            }
        }
    }
    //window.log(result);
    return result;
}

/**
 *
 * @param queryId
 * @returns {Query|null}
 */
function getQueryById(queryId) {
    log(queryId);
    var value = window.localStorage.getItem("query_" + queryId);
    log("value: " + value);
    if (value === null) {
        return null;
    }
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var maxVer = -1;
    var maxVerIndex = -1;
    var j;

    for (j = 0; j < arr.length; j++) {
        if (arr[j]._version > maxVer) {
            maxVer = arr[j]._version;
            maxVerIndex = j;
        }
    }

    return arr[maxVerIndex];
}

function deleteQueryById(queryId) {
    window.localStorage.removeItem("query_" + queryId);
}


/**
 * Set query id as a parameter of this function to the
 * local storage with key currentId.
 *
 * @param queryId
 */
function setCurrentQueryId(queryId) {
    window.localStorage.setItem(currentId, "query_" + queryId);
}

function getCurrentQuery() {
    let currentId = getCurrentQueryId();
    return getQueryById(currentId);
}

function getCurrentVersionQuery() {
    let currentId = getCurrentQueryId();
    let currentVersion = getCurrentQueryVersion();
    return getQueryByIdAndByVersion(currentId, currentVersion);
}

function setCurrentVersion(currentVersionId) {
    window.localStorage.setItem(currentVersion, currentVersionId);
}

function setId(newId) {
    window.localStorage.setItem(id, newId);
}

/**
 *
 * @param queryId
 * @returns {Query|null}
 */
function getQueryByIdAndByVersion(queryId, queryVer) {
    var value = window.localStorage.getItem("query_" + queryId);
    if (value === null) {
        return null;
    }
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var j;

    for (j = 0; j < arr.length; j++) {
        if (arr[j]._version == queryVer) {
            window.log(arr[j]);
            return  arr[j];
        }
    }
    return null;
}

function deleteQueryById(queryId) {
    window.localStorage.removeItem("query_" + queryId);
}

/**
 * Function which will get all queries from local
 * storage for export.
 *
 * @returns {string}
 */
function getAllQueriesForExport() {
    let id = getIdFromLs();
    let queries = "";

    for (let i = 0; i < id; i++) {
        let query = localStorage.getItem("query_" + i.toString());
        if (query) {
            queries = queries + i + "=" + query + endLineChar + newLineChar;
        }
    }

    return queries;
}

/**
 * This function will first delete all data from LS and
 * save all data from imported file to the local storage.
 *
 * @param {string}content
 */
function setAllQueriesFromImport(content) {
    window.localStorage.clear();
    let array = content.split(endLineChar);
    for (let i = 0; i < (array.length - 1); i++) {
        switch(i) {
            case 0:
                log(array[0]);
                break;
            case 1:
                log(array[1]);
                break;
            case 2:
                let newId = getStringAfterChar(array[i]);
                setId(newId);
                break;
            case 3:
                let newCurId = getStringAfterChar(array[i]);
                setCurrentQueryId(newCurId);
                break;
            case 4:
                let newCurVer = getStringAfterChar(array[i]);
                setCurrentVersion(newCurVer);
                break;
            default:
                let queryId = getStringBeforeChar(array[i]).substr(1);
                let queryData = getStringAfterChar(array[i]);
                window.localStorage.setItem("query_" + queryId, queryData);
        }
    }
    showToast(DATA_IMPORTED);
    location.reload();
}
