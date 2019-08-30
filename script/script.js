//card dragable
$(function () {
    $("#parent, #parent1").sortable({
        connectWith: ".list-items"
    }).disableSelection();
});

//replicate new card
document.getElementById('button').onclick = repeat;

var i = 0;
var original = document.getElementById('repeatTHIS');


function repeat() {
    var clone = original.cloneNode(true);
    clone.id = "repeatTHIS" + ++i;
    original.parentNode.appendChild(clone);
}

//editable li items on click
var editableLis = document.querySelectorAll("li.editableLi");
window.isEditingALi = false;
editableLis.forEach(function (li) {
    li.addEventListener("click", function () {
        if (this.getAttribute("contenteditable") != "true") {
            window.isEdiconsttingALi = this;
            var wantEdit = window.confirm("You want to edit this element content ?");
            if (wantEdit) this.setAttribute("contenteditable", true);
            this.focus();
        }
    });
});
document.addEventListener("click", function (e) {
    e = (e || window.event);
    e.preventDefault();
    var path = e.path;
    var canGetReset = true;
    for (var i = 0; i < path.length - 4; i++) {
        if (path[i] == window.isEditingALi) canGetReset = false;
    }
    if (canGetReset) window.isEditingALi.removeAttribute("contenteditable");
});