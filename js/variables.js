// ajax request method
var requestMethod = "GET";

// test query
var testQuery = "SELECT ?subject ?predicate ?object\n" +
    "WHERE {\n" +
    "  ?subject ?predicate ?object\n" +
    "}\n" +
    "LIMIT 1";

// test string for check response
var queryHeader = "[\"subject\",\"predicate\",\"object\"]";

// HTML tag for render sidebar items
var sideBarItem1 = '<li>' +
    '<a href="#test" onclick="log(1)">' +
    '<div>' +
    '<label class="cut-query-name">';
var sideBarItem2 = '</label>' +
    '</div>' +
    '<div>' +
    '<label class="small-text cut-query-description">';
var sideBarItem3 = '</label>' +
    '</div>' +
    '<div>';
var sideBarItem4 = '</div>' +
    '</a>' +
    '</li>';

var beginTagHeading5 = '<h5>';
var endTagHeading5 = '</h5>';

// HTML tags for render simple tag
var tagForItem1 = '<span class="badge badge-primary">';
var tagForItem2 = '</span>';

// HTML tag for tag input field
var tagForTagInput = '<div class="form-control tags" id="tags">' +
    '<span class="badge badge-primary tagLabel" data-badge="1">das <a href="#" data-badge="1" aria-label="close" class="closelabel">×</a></span>' +
    '<input type="text" class="labelinput">' +
    '<input id="tags-values" type="hidden" value="" name="result">' +
    '</div>';