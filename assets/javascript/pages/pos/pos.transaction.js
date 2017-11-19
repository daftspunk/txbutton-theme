//
// Transaction
//

var autoCheckTimer,
    autoCheckCurrent = 0,
    autoCheckInterval = 5,
    autoCheckLocked = false,
    isSalePaid = false

function flipPaymentCard(force) {
    $('#flipContainer').toggleClass('is-flipped', force)
}

function keyPadCheckPayment() {
    var $button = $('#keyPadPushPrimary')

    if ($button.hasClass('is-loading')) {
        return
    }

    if ($button.hasClass('is-disabled')) {
        return
    }

    var $secondaryMenu = $('#secondaryMenu'),
        $status = $('#partialPosTransactionStatus')

    if (!$secondaryMenu.is(':visible')) {
        $('[data-presend]', $status).hide()
        $('[data-pending]', $status).show()
        $('#secondaryMenu').show()
    }

    flipPaymentCard(true)

    checkPaymentInternal()
    resetAutoChecker(5)
}

function keyPadNewPayment() {
    if (!isSalePaid && !confirm('Sale is not paid yet, continue anyway?')) {
        return
    }

    location.reload()
}

function checkPaymentInternal() {
    keyPadLoading(true)
    autoCheckLocked = true

    $('#posTransactionForm').request('onCheckPayment', {
        update: {
            'pos/transaction-progress': '#partialPosTransactionProgress',
            'pos/transaction-status': '#partialPosTransactionStatus'
        }
    })
    .always(function() {
        keyPadLoading(false)
        autoCheckLocked = false
    })
}

function makeQrCode() {
    generateQR($('#qrcode'))
}

function makeSalePaid() {
    isSalePaid = true
    stopAutoChecker()
    $('#keyPadPushPrimary').addClass('is-disabled')
}

function resetAutoChecker(sec) {
    if (sec) {
        stopAutoChecker()
        autoCheckInterval = sec
        startAutoChecker()
    }
    else {
        autoCheckInterval = autoCheckInterval + 5
    }

    autoCheckCurrent = autoCheckInterval
}

function stopAutoChecker() {
    $('#autoCheckTimer').removeClass('is-active')
    clearInterval(autoCheckTimer)
}

function startAutoChecker() {
    autoCheckCurrent = autoCheckInterval
    autoCheckTimer = setInterval(autoCheckerTick, 1000)
}

function autoCheckerTick() {
    if (autoCheckLocked) {
        return
    }

    if (autoCheckCurrent <= 0) {
        resetAutoChecker()
        checkPaymentInternal()
        $('#autoCheckTimer').removeClass('is-active')
    }
    else {
        $('#autoCheckTimer').addClass('is-active').text('('+autoCheckCurrent+')')
        autoCheckCurrent--
    }
}
