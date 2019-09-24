$(document).ready(function () {
    $('.ajax-popup-link').magnificPopup({
        type: 'ajax'
    });

});

//send upsell form
$('body').on("click", '[data-uitype="save_upsell"]', function (e) {

    e.preventDefault();
    e.stopPropagation();

    openLoadingModal();

    if($(this).attr("data-tracking-price")){
        try {
            if (fbq !== undefined) {
                fbq('track', 'Purchase', {currency: "USD", value: $(this).attr("data-tracking-price")});
            }
        }catch (err) {console.log(err);}
    }


    $(this).closest('[data-uitype="upsell_form"]').submit();
});

function loadingAndSubmit(){
    openLoadingModal();
    //we need this code only if the buy button isn't submit the form
    $('[data-uitype="upsell_form"]').submit();
}

function openLoadingModal() {
    $.magnificPopup.open({
        items: {
            src: $('[data-uitype="modal-container"]').html(),
            type: 'inline',
        },
        modal: 'true'
    });
}

function openConfirmModal() {
    $.magnificPopup.open({
        items: {
            src: $('[data-uitype="confirm-modal-container"]').html(),
            type: 'inline',
        },
        modal: 'true'
    });
}

function closeConfirmModal() {
    $.magnificPopup.close();
    setTimeout(function () {
        openLoadingModal();
    }, 300);
}

$('body').on("click", '[data-uitype="close_modal"]', function (e) {
    $.magnificPopup.close();
})

function getDate(days) {
    var monthNames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var dayNames = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var now = new Date();
    now.setDate(now.getDate() + days);
    var nowString = dayNames[now.getDay()] + ", " + monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
    document.write(nowString);
}

$(document).ready(function() {
    $('.numeric-data').on("keyup", function () {
        var value = $(this).val();
        var regex_cell = /[^[0-9]]*/gi;
        var new_value = value.replace(regex_cell, '');
        $(this).val(new_value);
    });
});