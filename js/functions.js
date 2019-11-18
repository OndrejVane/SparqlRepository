/**
 * Check valid input URL.
 *
 * @param stringUrl            input URL
 * @returns {boolean}        boolean
 */
function isURL(stringUrl) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + //	 protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(stringUrl);
}

function checkResponse(response, isSuccess) {
    if (isSuccess && response.includes(queryHeader)) {
        setUrlEndpointButtonOnSuccess();
    } else {
        setUrlEndpointButtonOnError();
    }
}

function log(message) {
    console.log(message);
}

function buildSideBarItem(query) {

    var item = sideBarItem1 + query._id
        + sideBarItem2 + query._id
        + sideBarItem3 + query._id
        + sideBarItem4 + query._name
        + sideBarItem5 + query._desc
        + sideBarItem6;

    var tagsArray = query._tags;

    for (let i = 0; i < tagsArray.length; i++) {
        item = item + buildTagForSideItem(tagsArray[i]);
    }


    return item + sideBarItem7;
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
    let tagListElement = $('#tag-list');
    let currentQuery = getCurrentVersionQuery();

    if (isEditable) {
        let tagInput;
        let tagsValues = "";
        if (currentQuery === null || currentQuery._tags.length === 0) {

            log("Render empty tag input");

            tagInput = tagForTagInput1 + tagForTagInput2;

        } else {
            log("Tags are not empty");
            let tags = currentQuery._tags;

            tagInput = tagForTagInput1;
            for (let i = 0; i < tags.length; i++) {
                tagsValues = tagsValues + tags[i] + ',';
            }
            tagsValues = tagsValues.slice(0, -1);
            tagInput = tagInput + tagForTagInput2;
        }

        tagListElement.empty();
        tagListElement.append(tagInput);
        if (tagsValues !== "") {
            getTagsValuesElement().value = tagsValues;
        }

        $('#tags').tagInput({
            labelClass: "badge badge-primary"
        });
    } else {
        renderTagsForCurrentQuery(currentQuery._tags);
    }
}

/**
 * Function which is setting disable and
 * enable Next and Previous bttuon.
 */
function handleNextAndPrevButton() {
    if (hasPrevVersion()) {
        setPrevButtonEnable();
    } else {
        setPrevButtonDisabled();
    }

    if (hasNextVersion()) {
        setNextButtonEnable()
    } else {
        setNextButtonDisable();
    }
}

/**
 * Function will check if query contains
 * sequence with ¤value¤.
 *
 * @param {String} query
 */
function checkIfContainsDelimiter(query) {
    let regex = RegExp('[' + delimiter + '][a-zA-Z0-9{ščřžýáíéó}]*[' + delimiter + ']');

    return regex.test(query);
}

/**
 * Function will replace sequence ¤value¤
 * in query with variable.
 *
 * @param {String} query
 * @param {String} variable
 */
function replaceVariableInQuery(query, variable) {
    let regex = RegExp('[' + delimiter + '][a-zA-Z0-9{ščřžýáíéó}]*[' + delimiter + ']');
    return query.replace(regex, variable);
}