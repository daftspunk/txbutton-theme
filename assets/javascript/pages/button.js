
/*
 * Target button elements for clipboard activity
 */
new Clipboard('.btn');

function generateButton() {

    var templateHtml = $('#buttonGenerateTemplate').html(),
        $form = $('#buttonForm'),
        $textarea = $('#buttonMarkupTextarea')

    var params = formToObject($form)

    $('#buttonResultsContainer').show()

    params.business = params.merchant_id == 'secure'
        ? params.merchant_secure
        : params.merchant_email

    $textarea.val(Mustache.render(templateHtml, params).trim())

    return false
}

function formToObject($form) {
    var formArray = $form.serializeArray(),
        returnArray = {}

    for (var i = 0; i < formArray.length; i++){
        returnArray[formArray[i]['name']] = formArray[i]['value']
    }

    return returnArray
}
