$(function () {
    $("#parent, #parent1").sortable({
        connectWith: ".list-items"
    }).disableSelection();
});