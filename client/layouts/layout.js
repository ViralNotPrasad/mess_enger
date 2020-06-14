$(document).ready(function(){
    // $('.list-group li:last-child').css("background-color", "yellow");
    // var curMsg = document.getElementsByClassName("list-group");
    // alert(curMsg.length + "|||");
    console.log("test");
    // $('.list-group li:last-child')[0].scrollIntoView();

    $('.document').bind("DOMSubtreeModified", function() {
        alert("tree changed");
        $('.list-group li:last-child')[0].scrollIntoView();
    });
  });

