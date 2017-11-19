function generateQR($el) {
    var elem = $el,
        url;

    var config = {
        width: 256,
        height: 256,
        colorDark : "#222f3d",
        colorLight : "#ffffff"
    }

    url = buildBitcoinURI(
        elem.attr("data-address"),
        elem.attr("data-amount"),
        elem.attr("data-label")
    );

    var options = $.extend({}, config, {
        text: url
    });

    var qrCode = new QRCode($el.get(0), options);
}

function buildBitcoinURI(address, amount, label, message) {
    var tmpl = ["bitcoincash:", address, "?"];

    if(amount) {
        tmpl = tmpl.concat(["amount=", encodeURIComponent(amount), "&"]);
    }

    if(label) {
        tmpl = tmpl.concat(["label=", encodeURIComponent(label), "&"]);
    }

    if(message) {
        tmpl = tmpl.concat(["message=", encodeURIComponent(message), "&"]);
    }
    // Remove prefixing extra
    var lastc = tmpl[tmpl.length-1];
    if (lastc == "&" || lastc == "?") {
        tmpl = tmpl.splice(0, tmpl.length-1);
    }

    return tmpl.join("");
}
