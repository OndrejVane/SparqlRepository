// test query
var testQuery = "SELECT ?subject ?predicate ?object\n" +
    "WHERE {\n" +
    "  ?subject ?predicate ?object\n" +
    "}\n" +
    "LIMIT 1";

// test string for check response
var queryHeader = "[\"subject\",\"predicate\",\"object\"]";

// HTML tag for render sidebar items
let sideBarItem1 = '<li id="query';
// id
let sideBarItem2 = '">' +
    '<span class="close" onclick="deleteQueryWithId(';
// id
let sideBarItem3 = ')">&times;</span>' +
    '<a onclick="showQueryWithId(';
// id
let sideBarItem4 = ')">' +
    '<div>' +
    '<label class="cut-query-name">';
// queryName
let sideBarItem5 = '</label>' +
    '</div>' +
    '<div>' +
    '<label class="small-text cut-query-description">';
// queryDescription
let sideBarItem6 = '</label>' +
    '</div>' +
    '<div class="side_item_tags">';
// tags
let sideBarItem7 = '</div>' +
    '<label type="hidden" style="display:none">';

let sideBarItem8 = '</label>' +
    '</a>' +
    '</li>';

var beginTagHeading5 = '<h5>';
var endTagHeading5 = '</h5>';

// HTML tags for render simple tag
var tagForItem1 = '<span class="badge badge-primary">';
var tagForItem2 = '</span>';

// HTML tags for tag input
var tagForTagInput1 = '<div class="form-control tags" id="tags">';

var tagForTagInput2 = '<input type="text" class="labelinput" onkeyup="onQueryChange()">' +
    '<input id="tags-values" type="hidden" value="" name="result">' +
    '</div>';

// global variable for table
var table;