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