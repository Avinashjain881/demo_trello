
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


document.addEventListener("click", function (e) { //Of course you can merge this EventListener with the next one but I am separing them just to make things clear for you !

    var elementsIdSelector = "editableLi";

    e = (e || window.event);
    e.preventDefault();
    var path = e.path;
    for (var i = 0; i < path.length - 4; i++) {
        if (path[i].tagName == "LI" && path[i].id == elementsIdSelector) {
            //Found a Li element with the id required ( Even dynamically created li would fires ! )

            //Do whatever you want there 

            path[i].addEventListener("click", function () {
                if (this.getAttribute("contenteditable") != "true") {
                    var wantEdit = window.confirm("You want to edit this element content ?");
                    if (wantEdit) {
                        this.setAttribute("contenteditable", true);
                        window.isEditingALi = this;
                        this.focus();
                    } else {
                        window.isEditingALi = false;
                    }
                }
            });

        }
    }
});

document.addEventListener("click", function (e) {
    e = (e || window.event);
    e.preventDefault();
    var path = e.path;
    var canGetReset = true;
    for (var i = 0; i < path.length - 4; i++) {
        if (path[i] == window.isEditingALi) canGetReset = false;
    }
    if (canGetReset && window.isEditingALi) {
        window.isEditingALi.removeAttribute("contenteditable");

        //Here you can add your Ajax request or whatever function you want to do after the user finish editing the li ..


        window.isEditingALi = false;

    }
});


//This is function to the dynamically created element would work

function createEditableLi() {
    const ul = document.querySelector("ul");
    const newLi = document.createElement("li");
    newLi.setAttribute("id", "editableLi");
    newLi.innerHTML = "New Li";
    ul.appendChild(newLi);
}



