var POS_MODE, POS_SCREEN

//
// Keypad
//

function appendKeyPadValue(val) {
    var $keypad = $('#keyPadValue')

    if ($keypad.val().length < 9) {
        $keypad.val($keypad.val() + val)
    }
}

function removeKeyPadValue() {
    var $keypad = $('#keyPadValue')
    $keypad.val($keypad.val().slice(0, -1))
}

function keyPadPush(val) {
    var $keypad = $('#keyPadValue')

    var _event = jQuery.Event('posKeyPadPush')
    $keypad.closest('form').trigger(_event, [val])
    if (_event.isDefaultPrevented()) return

    appendKeyPadValue(val)
    updateScreen()
}

function keyPadDelete() {
    var $keypad = $('#keyPadValue')

    var _event = jQuery.Event('posKeyPadDelete')
    $keypad.closest('form').trigger(_event)
    if (_event.isDefaultPrevented()) return

    removeKeyPadValue()
    updateScreen()
}

function keyPadPushPrimary() {
    var $button = $('#keyPadPushPrimary')

    if ($button.hasClass('is-loading')) {
        return
    }

    var _event = jQuery.Event('posKeyPadPushOk')
    $button.closest('form').trigger(_event)
    if (_event.isDefaultPrevented()) return

    $button.closest('form').submit()
}

function keyPadLoading(toggle) {
    $('#keyPadPushPrimary').toggleClass('is-loading', toggle)
}

//
// Screen
//

function updateScreen() {
    if (POS_SCREEN == 'pin') {
        updateScreenPin()
    }
    else {
        updateScreenAmt()
    }
}

function updateScreenAmt() {
    var $keypad = $('#keyPadValue'),
        $screen = $('#screenControl'),
        $amount = $('.screen-amount', $screen),
        val = $keypad.val(),
        num = numeral(val / 100).format('0,0.00');

    $('span', $amount).html(num.slice(0, -2))
    $('small', $amount).html(num.slice(-2))
}

function updateScreenPin() {
    var $keypad = $('#keyPadValue'),
        $screen = $('#screenControl'),
        $amount = $('.screen-amount', $screen),
        val = $keypad.val()

    $('span', $amount).html(Array(val.length + 1).join("*"))
}
