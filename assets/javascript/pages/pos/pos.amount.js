//
// Amount
//

$(document).on('posKeyPadPushOk', '#posAmountForm', function(event) {
    if (POS_SCREEN == 'amount') {
        event.preventDefault()
        keyPadConfirmAmount()
    }
    else if (POS_SCREEN == 'confirm') {
        keyPadSubmitAmount()
    }
})

$(document).on('posKeyPadPush posKeyPadDelete', '#posAmountForm', function(event, val) {
    if (POS_SCREEN == 'confirm') {
        event.preventDefault()
        keyPadRevertAmount()
    }
})

function keyPadSubmitAmount() {
    keyPadLoading(true)

    $('#posAmountForm').request('onSubmitAmount', {
        update: {
            'pos/slide': '#posContainer'
        }
    })
    .always(function() {
        $.oc.stripeLoadIndicator.hide()
        keyPadLoading(false)
    })
}

function keyPadConfirmAmount() {
    keyPadLoading(true)

    $('#posAmountForm').request('onConfirmAmount', {
        update: {
            'pos/screen': '#partialPosScreen'
        }
    })
    .always(function() {
        keyPadLoading(false)
    })
    .done(function() {
        $('#keyPadPushPrimary').addClass('is-confirm')
    })
}

function keyPadRevertAmount() {
    keyPadLoading(true)

    $('#posAmountForm').request('onRevertAmount', {
        update: {
            'pos/screen': '#partialPosScreen'
        }
    })
    .always(function() {
        keyPadLoading(false)
        updateScreen()
        $('#keyPadPushPrimary').removeClass('is-confirm')
    })
}
