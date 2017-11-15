var POS_MODE, POS_SCREEN

//
// Keypad
//

function keyPadPush(val) {
    var $keypad = $('#keyPadValue')

    if ($keypad.val().length < 9) {
        $keypad.val($keypad.val() + val)
    }

    updateScreen()
}

function keyPadDelete() {
    var $keypad = $('#keyPadValue')
    $keypad.val($keypad.val().slice(0, -1))
    updateScreen()
}

function keyPadPushOk() {
    $('TODO#sectionAmount').hide()
    $('TODO#sectionTransaction').show()
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

//
// Amount
//

function flipPaymentCard(force) {
    $('#flipContainer').toggleClass('is-flipped', force)
}

function keyPadCheckPayment() {
    var $status = $('#paymentStatus')
    $('[data-presend]', $status).hide()
    $('[data-pending]', $status).show()
    flipPaymentCard(true)
}

function makeQrCode() {
    generateQR($('#qrcode'))
}

makeQrCode()

//
// Transaction
//
