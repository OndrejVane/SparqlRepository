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