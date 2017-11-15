$(document)
    .on('ajaxPromise', '[data-request]', function() {
        $('#logoCircle').addClass('loading')

        // This code will cover instances where the element has been removed
        // from the DOM, making the resolution event below an orphan.
        var $el = $(this)
        $(window).one('ajaxUpdateComplete', function() {
            if ($el.closest('html').length === 0)
                $('#logoCircle').removeClass('loading')
         })
    })
    .on('ajaxFail ajaxDone', '[data-request]', function() {
        $('#logoCircle').removeClass('loading')
    })


function homeRegisterWorkflow() {
    $('#homePageContainer').addClass('register-workflow')
    $('#inputName').focus()
}

function homeLoginWorkflow() {
    $('#homePageContainer').addClass('login-workflow')
    $('#inputPassword').focus()
}

$(document).ready(function() {
    $('#inputEmail').focus()
})
