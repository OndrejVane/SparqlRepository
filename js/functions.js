/**
 * Check valid input URL.
 *
 * @param stringUrl			input URL
 * @returns {boolean}		boolean
 */
function isURL(stringUrl) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ //	 protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(stringUrl);
}

function checkResponse(response, isSuccess) {
    if(isSuccess && response.includes(queryHeader)){
        setUrlEndpointButtonOnSuccess();
    }else {
        setUrlEndpointButtonOnError();
    }
}

function log(message) {
    console.log(message);
}

function buildSideBarItem(query) {

    var item = sideBarItem1 + query._name
                + sideBarItem2 + query._desc
                + sideBarItem3;

    var tagsArray = query._tags;

    for (let i = 0; i < tagsArray.length; i++) {
        item = item + buildTagForSideItem(tagsArray[i]);
    }


    return item + sideBarItem4;
}

function buildTagForSideItem(tagName) {
    return tagForItem1 + tagName + tagForItem2;
}

function buildTagForContent(tagName) {
    return beginTagHeading5 + buildTagForSideItem(tagName) + endTagHeading5;
}

/**
 * Function for change tags view to tags input label.
 *
 * @param {boolean} isEditable
 */
function setTagsEditable(isEditable) {

    if(isEditable){
        $(function(){
            let tagList = $('#tag-list');
            tagList.empty();
            tagList.append(tagForTagInput);
            $('#tags').tagInput({
                labelClass:"badge badge-primary"
            });


        });
    }else {
        //TODO
        log("Todo")
    }
}