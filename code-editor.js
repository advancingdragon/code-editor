var KEY_TAB = 9;
var KEY_BACK = 8;
var KEY_ENTER = 13;

var TAB_REPLACE = "    ";

var moveSelectionRange = function(element, start, end) {
    if (element.selectionStart && element.selectionEnd) {
        element.selectionStart = element.selectionStart + start;
        element.selectionEnd = element.selectionEnd + end;
    } else {
        var range = document.selection.createRange();
        range.moveStart("character", start);
        range.moveEnd("character", end);
        range.select();
    }
};
var getSelection = function(element) {
    if (element.selectionStart && element.selectionEnd) {
        return element.value.substring(element.selectionStart,
                                       element.selectionEnd);
    } else {
        return document.selection.createRange().text;
    }
};

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
            if (window.event.keyCode === KEY_TAB) {
                window.event.returnValue = false;
                replaceSelection(editor, TAB_REPLACE, false);
            } else if (window.event.keyCode === KEY_BACK && 
                       getSelection(editor) === "") {
                // proceed if nothing is selected
                var moved = moveSelectionRange(editor, -4, 0); // to cope with beginning of text TODO NOT IMPLEMENTED YET
                var sel = getSelection(editor);
                //alert(sel);
                if (sel === TAB_REPLACE) {
                    window.event.returnValue = false;
                    replaceSelection(editor, "");
                } else {
                    moveSelectionRange(editor, 4, 0);
                }
            }
        });
    });
}
