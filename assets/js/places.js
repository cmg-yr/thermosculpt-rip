var autocomplete;

var componentForm = {
    country: 'short_name',
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    postal_code: 'short_name'
};

function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('gmap_autocomplete')),
        {types: ['geocode']});

    autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    var place = autocomplete.getPlace();
    for (var component in componentForm) {
        if(typeof document.getElementById(component) !== "undefined" && document.getElementById(component) !== null)
        {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }
    }

    var address = "";
    var state = "";
    var country = "";

    var $GoogleShippingStatedropdown = $('#shippingState');
    var $GoogleShippingCountrydropdown = $('#shippingCountry');

    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];

            id = addressType;

            if(addressType == "locality") {
                id="city";
            }
            if(addressType == "postal_code") {
                id="zip";
            }

            if(addressType == "street_number") {
                address+=val;
            }

            if(addressType == "route") {
                address+=" "+val;
            }

            if(addressType == "administrative_area_level_1") {
                id="shippingState";
                state = val;
            }
            if(addressType == "country") {
                id="shippingCountry";
                country = val;
            }



            if(typeof document.getElementById(id) !== "undefined" && document.getElementById(id) !== null){
                document.getElementById(id).value = val;
            }
        }
    }
    document.getElementById("gmap_autocomplete").value = address;

    if (country != "") {
        $GoogleShippingCountrydropdown.val(country);
        $GoogleShippingCountrydropdown.trigger('change');
        setTimeout(function () {
            if (state != "") {
                $GoogleShippingStatedropdown.val(state);
            }
        }, 500);
    }

}

//we have to add the id=gmap_autocomplete to the address field, zip for Postcode, city for City
// <?php if(!empty(GOOGLE_PLACES_API_ID)){ ?>
// <script src="resources/gmap/places.js"></script>
// <script type="text/javascript" async defer src="https://maps.googleapis.com/maps/api/js?key=<?php echo GOOGLE_PLACES_API_ID; ?>&libraries=places&callback=initAutocomplete"></script>
// <?php } ?>

