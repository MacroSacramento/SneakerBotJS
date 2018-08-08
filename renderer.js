'use strict'

const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
var $ = require('jquery')
require('bootstrap')

$("input#url").change(() => {
    var model = $('#url').val().toLowerCase();
    if (model.indexOf("https://www.adidas.com/us/") && model != '' == -1) {
        $(".cart-input").prepend(" \
            <div class=\"alert alert-warning alert-dismissible fade show\" role=\"alert\"> \
                <strong>Error!</strong> You must input a valid adidas URL. \
                <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"> \
                    <span aria-hidden=\"true\">&times;</span> \
                </button> \
            </div> \
        ")
        $(".shoe-image").attr("src", " ");
    } else {
        model = model.split(".html");
        model = model[0].slice(-6).toUpperCase();
        $(".shoe-image").attr("src", "https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/Sites-adidas-US-Site/Sites-adidas-products/en_US/v1533713058245/zoom/" + model + "_01_standard.jpg");
    }
})

function addToCart() {

    var model = $('#url').val();
    //var model = document.getElementById("url").value;
    model = model.split(".html");
    model = model[0].slice(-6);

    var size = document.getElementById("size").value;
    var trueSize = ((20 * size) + 450)

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.adidas.com/api/cart_items?sitePath=us", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {//Call a function when the state changes.
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log("Cart Request Successful");
        }
    }
    xhr.send(" \
    { \
        \"product_id\": \"" + model + "\", \
        \"quantity\": 1, \
        \"product_variation_sku\": \"" + model + "_" + trueSize.toString() + "\", \
        \"size\": \""+ size.toString() + "\", \
        \"recipe\": null, \
        \"legacy_recipe\": null, \
        \"invalidFields\": [], \
        \"isValidating\": false, \
        \"clientCaptchaResponse\": \"\" \
    }");
}

function openDevTools(){
    var window = BrowserWindow.getFocusedWindow();
    window.webContents.openDevTools();
}

function closeElectron() {
    var window = BrowserWindow.getFocusedWindow();
    window.close();
}

function openCart() {
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        title: "Adidas Cart"
    })
    win.on('close', () => {
        win = null;
    })
    win.loadURL("https://www.adidas.com/on/demandware.store/Sites-adidas-US-Site/en_US/Cart-Show")
    win.show()
}
