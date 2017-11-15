/*
 * Application
 */

$(document).render(function(){
    $(document).tooltip({
        selector: "[data-toggle=tooltip]"
    })
    $('[data-toggle=popover]').popover({
        html: true
    })
})
