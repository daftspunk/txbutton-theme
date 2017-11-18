//
// Transaction
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
