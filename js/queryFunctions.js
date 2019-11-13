function init() {
    if(window.localStorage.getItem("id") === null){
        window.localStorage.setItem("id", 1);
        log("id successfully initialized to value 1");
    }

    if(window.localStorage.getItem("currentId") === null){
        window.localStorage.setItem("currentId",-1);
        log("currentId successfully initialized to value -1");
    }

    if(window.localStorage.getItem("currentVersion") === null){
        window.localStorage.setItem("currentVersion", -1);
        log("currentVersionId successfully initialized to value -1");
    }

    //TODO: načíst query podle currentId, pokud je currentId == -1, tak vezmeme třeba první query
}

function addNewQuery() {
    var id = window.localStorage.getItem("id");
    incrementId();
    var myQuery = new Query(id, getQueryName(), getQueryDescription(), getEndPointUrl(), getTagsArray(), getSparqlQuery(), 1);
    //var ver = myQuery.version;

    window.localStorage.setItem(id,JSON.stringify({lastVersion: 1, queries : [myQuery]}));
}

function incrementId() {
    var id = window.localStorage.getItem("id");
    id++;
    window.localStorage.setItem("id",id);
}

function addNewVersion() {
    var currId = window.localStorage.getItem("currentId");
    var value = window.localStorage.getItem(currId);
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);

    var lastVersion = parsed.lastVersion;
    lastVersion++;

    arr.push(new Query(currId, getQueryName(), getQueryDescription(), getEndPointUrl(),getTagsArray(),getSparqlQuery(), lastVersion))

    window.localStorage.setItem(currId,JSON.stringify({lastVersion: lastVersion, queries : arr}));

    /*for (i = 0; i < arr.length; i++) {
        //tmp = JSON.parse(arr[i])
        //window.localStorage.setItem("test", arr[i].desc)
        window.console.log(arr[i]._tags);
    }*/
    //window.localStorage.setItem("test", arr.queries.toString())
    //window.console.log(arr[0]);
}

function deleteVersion() {
    //TODO: kontrola zda nejake query zobrazeno, zmenit ziskani currentVersion, kdyz smazemo posledni version -> smazat cely zaznam

    var currId = window.localStorage.getItem("currentId");
    var currVer = window.localStorage.getItem("currentVersion");
    var value = window.localStorage.getItem(currId);
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var index;
    var lastVersion = parsed.lastVersion;

    for (i = 0; i < arr.length; i++) {
        if (arr[i]._version == currVer){
            index = i;
            break;
        }
    }

    arr.splice(index,1);

    window.localStorage.setItem(currId,JSON.stringify({lastVersion: lastVersion, queries : arr}));
}

function deleteQuery() {
    //TODO: pres Sidebar
}

/**
 *
 * @param json
 * @returns {Query[]}
 */
function jsonToArray(json){
    var result = [];
    var keys = Object.keys(json);
    keys.forEach(function(key){
        result.push(json[key]);
    });
    return result;
}

var currQuery;

function getSearchedQuery() {
    //TODO: pres Sidebar - zobrazit query (vyplnit pole/vzhled), zmenit currentId

    var currId = window.localStorage.getItem("currentId");
    var value = window.localStorage.getItem(currId);
    var parsed = JSON.parse(value);

    currQuery = parsed; //anebo se vzdy dotazovat na db
}

/**
 *
 * @returns {Query|null}
 */
function getPrevVersion() {
    //TODO: kontrola zda nejake query zobrazeno -> sedive tlacitko
    // kdyz arr.length == 1 -> sedive tlacitko
    // zmenit currentVersion -> ja provadim zmenu (nebo ty na frontendu)

    var currId = window.localStorage.getItem("currentId");
    var currVer = window.localStorage.getItem("currentVersion");
    var value = window.localStorage.getItem(currId);
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var i;
    var minDiff = 10000;
    var minDiffIndex = -1;

    if (arr.length > 1){ //mozna neni treba
        for (i = 0; i < arr.length; i++) {
            var temp = currVer - arr[i]._version;
            if (temp > 0 && temp < minDiff){
                minDiff = temp;
                minDiffIndex = i;
            }
        }

        if (minDiffIndex == -1){ //mozna neni treba kdyz kontrola na frontendu
            return null;
        } else{
            //window.log(arr[minDiffIndex]);
            window.localStorage.setItem("currentVersion", arr[minDiffIndex]._version);
            return arr[minDiffIndex];
        }
    } else{
        return null;
    }
}

/**
 *
 * @returns {Query|null}
 */
function getNextVersion() {
    //TODO: kontrola zda nejake query zobrazeno -> sedive tlacitko
    // kdyz arr.length == 1 -> sedive tlacitko
    // zmenit currentVersion -> ja provadim zmenu

    var currId = window.localStorage.getItem("currentId");
    var currVer = window.localStorage.getItem("currentVersion");
    var value = window.localStorage.getItem(currId);
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var i;
    var minDiff = 10000;
    var minDiffIndex = -1;

    if (arr.length > 1){ //mozna neni treba
        for (i = 0; i < arr.length; i++) {
            var temp = arr[i]._version - currVer;
            if (temp > 0 && temp < minDiff){
                minDiff = temp;
                minDiffIndex = i;
            }
        }

        if (minDiffIndex == -1){ //mozna neni treba kdyz kontrola na frontendu
            return null;
        } else{
            //window.log(arr[minDiffIndex]);
            window.localStorage.setItem("currentVersion", arr[minDiffIndex]._version);
            return arr[minDiffIndex];
        }
    } else{
        return null;
    }
}

/**
 *
 * @returns {Query[]}
 */
function getAllQueries() {
    var id;
    var result = [];
    if(window.localStorage.getItem("id") !== null){
        id = window.localStorage.getItem("id");
        var i;
        var j;
        var len = window.localStorage.length;
        for (i = 0; i < len; i++){
            var k = window.localStorage.key(i);
            if (k != "id" && k != "currentId" && k != "currentVersion"){ //upravit pokud pridame globalni promennou
                result.push(getQueryById(k));
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
    var value = window.localStorage.getItem(queryId);
    if (value === null){
        return null;
    }
    var parsed = JSON.parse(value);
    var arr = jsonToArray(parsed.queries);
    var maxVer = -1;
    var maxVerIndex = -1;

    for (j = 0; j < arr.length; j++) {
        if (arr[j]._version > maxVer){
            maxVer = arr[j]._version;
            maxVerIndex = j;
        }
    }

    return arr[maxVerIndex];
}

function deleteQueryById(queryId) {
    window.localStorage.removeItem(queryId);
}


/**
 * Set query id as a parameter of this function to the
 * local storage with key currentId.
 *
 * @param queryId
 */
function setCurrentQueryId(queryId) {
    window.localStorage.setItem(currentId, queryId);
}

function getCurrentQuery() {
    let currentId = getCurrentQueryId();
    return getQueryById(currentId);
}
