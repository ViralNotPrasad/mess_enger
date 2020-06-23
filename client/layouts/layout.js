$(document).ready(function(){
    // $('.list-group li:last-child').css("background-color", "yellow");
    // var curMsg = document.getElementsByClassName("list-group");
    // alert(curMsg.length + "|||");
    // 
    // $('.list-group li:last-child')[0].scrollIntoView();

    $('.list-group').bind("DOMSubtreeModified", function() {
        alert("tree changed");
        $('.list-group li:last-child')[0].scrollIntoView();
        console.log("test");
    });
  });

