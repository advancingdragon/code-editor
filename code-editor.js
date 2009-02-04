var KEY_TAB = 9;
var KEY_ENTER = 13;

var TAB_REPLACE = "    ";

var moveSelectionRange = function(element, start, end) { };
var getSelection = function(element) { };

var replaceSelection = function(element, text, cursorAtStart) {
    if (element.selectionStart && element.selectionEnd) { // Firefox
        var start = element.selectionStart;
        var end = element.selectionEnd;
        var len = element.value.length;

        element.value = element.value.substring(0, start) + 
            text + 
            element.value.substring(end, len);
        element.selectionStart = start + text.length;
        element.selectionEnd = start + text.length;
    } else { // everything else
        var range = document.selection.createRange();
        range.text = text;
        range.collapse();
        range.select();
    }
};

if (window.addEventListener) { // W3C compliant browsers
    window.addEventListener("load", function(e) {
        var editor = document.getElementById("editor");

        editor.addEventListener("keydown", function(e) {
            if (e.keyCode === KEY_TAB) {
                e.preventDefault();
                replaceSelection(editor, TAB_REPLACE, false);
            }
        }, false);
    }, false);
} else if (window.attachEvent) { // Internet Exploder
    window.attachEvent("onload", function() {
        var editor = document.getElementById("editor");

        editor.attachEvent("onkeydown", function() {
            //alert(window.event.keyCode);
            if (window.event.keyCode === KEY_TAB) {
                window.event.returnValue = false;
                replaceSelection(editor, TAB_REPLACE, false);
            }
        });
    });
}
