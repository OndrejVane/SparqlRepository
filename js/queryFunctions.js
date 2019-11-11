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

    //TODO: načíst query podle currentId, pokud je currentId == -1, tak tak vezmeme třeba první query
}

function getQueryTags() { //docasna fce, predelat!! - vraci pole
    return ["tag1", "tag2", "tag3"];
}


function addNewQuery() {
    var id = window.localStorage.getItem("id");
    incrementId();
    var myQuery = new Query(getQueryName(), getQueryDescription(), getEndPointUrl(),getQueryTags(),getSparqlQuery(), 1)
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

    arr.push(new Query(getQueryName(), getQueryDescription(), getEndPointUrl(),getQueryTags(),getSparqlQuery(), lastVersion))

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

function getPrevVersion() {
    //TODO: kontrola zda nejake query zobrazeno, zmenit currentVersion, zmenit ziskani currentId

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

    if (index == 0){
        //nic - sedive tlacitko
    } else{
        //ukazat index - 1
        //nastavit query vlastnosti podle pole
    }

}

function getPrevVersion() {
    //TODO: kontrola zda nejake query zobrazeno, zmenit currentVersion

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

    if (index == arr.length-1){
        //nic - sedive tlacitko
    } else{
        //ukazat index + 1
        //nastavit query vlastnosti podle pole
    }
}

function getAllQueries() {
    var id;
    var result = [];
    if(window.localStorage.getItem("id") !== null){
        id = window.localStorage.getItem("id");
        var i;
        var j;
        var maxVer;
        var maxVerIndex;
        var len = window.localStorage.length;
        for (i = 0; i < len; i++){
            var k = window.localStorage.key(i);
            if (k != "id" && k != "currentId" && k != "currentVersion"){ //upravit pokud pridame globalni promennou
                var value = window.localStorage.getItem(k);
                var parsed = JSON.parse(value);
                var arr = jsonToArray(parsed.queries);
                maxVer = -1;
                maxVerIndex = -1;

                for (j = 0; j < arr.length; j++) {

                    if (arr[j]._version > maxVer){
                        maxVer = arr[j]._version;
                        maxVerIndex = j;
                    }
                }
                result.push(arr[maxVerIndex]);
            }
        }
    }
    //window.log(result);
    return result;
}

function getQueryById(queryId) {
    return window.localStorage.getItem(queryId); //null kdyz neexistuje
}