var domain_name = "https://stage.cappedoutmedia.com/social-v2/";

function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", domain_name + filename)
    } else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", domain_name + filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}

loadjscssfile("toastr.css", "css");
loadjscssfile("style/"+api_key+".css", "css");
loadjscssfile("toastr.js", "js");

var res_index = 1;
var res_length = 0;
$(document).ready(function () {
    call_api();
});

function call_api() {
    $.ajax({
        url: domain_name + "ajax.php?callback=jsonpcallback&key=" + api_key + "&v=" + api_version,
        type: "post",
        //tell jQuery to expect JSONP
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback: "jsonpcallback",
        success: function (res) {
            res_index = 1;
            res_length = Object.keys(res).length;
            show_popup(res);
        }
    });
}

function show_popup(res) {
    toastr.clear();
    toastr.options = {
        closeButton: false,
        newestOnTop: false,
        positionClass: popup_position === undefined ? 'toast-bottom-left' : popup_position,
        onclick: null,
        showDuration: 300,
        hideDuration: 1000,
        timeOut: (typeof popTiming == 'undefined') ? 11000 : (popTiming-1)*1000
    };

    toastr["success"](res[res_index], '');

    res_index++;
    if (res_index > res_length) {
        setTimeout(function () {
            call_api();
        }, 3000);
    } else {
        setTimeout(function () {
            show_popup(res);
        }, (typeof popTiming == 'undefined') ? 12000 : popTiming*1000);
    }
}