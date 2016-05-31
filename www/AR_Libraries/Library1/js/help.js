
    $(document).delegate("#one", 'pageinit', function (evt) {
    $(this).bind("swipeleft", function (e) {
        $.mobile.changePage("#two", {
            transition : 'slide'
        });
    });
}).delegate("#two", 'pageinit', function (evt) {
    $(this).bind("swiperight", function (e) {
        $.mobile.changePage("#one", {
            transition : 'slide',
            reverse    : true
        });
    });
}).delegate("#two", 'pageinit', function (evt) {
    $(this).bind("swipeleft", function (e) {
        $.mobile.changePage("#three", {
            transition : 'slide',
        });
    });
}).delegate("#three", 'pageinit', function (evt) {
    $(this).bind("swipeleft", function (e) {
        $.mobile.changePage("#four", {
            transition : 'slide',
        });
    });
}).delegate("#three", 'pageinit', function (evt) {
    $(this).bind("swiperight", function (e) {
        $.mobile.changePage("#two", {
            transition : 'slide',
            reverse    : true
        });
    });
}).delegate("#four", 'pageinit', function (evt) {
    $(this).bind("swiperight", function (e) {
        $.mobile.changePage("#three", {
            transition : 'slide',
            reverse    : true
        });
    });
}); 
