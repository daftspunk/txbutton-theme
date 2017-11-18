//
// Auth
//

$(document).on('ajaxSetup', '#posAuthForm', function(event, context) {
    context.options.handleErrorMessage = function(message) {
        $('#screenControl').addClass('has-error')
        $('#keyPadValue').val('')
        updateScreen()
    }
})

$(document).on('posKeyPadPush', '#posAuthForm', function() {
    $('#screenControl').removeClass('has-error')
})
