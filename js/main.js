// 'use strict';
//infoblck
var consolBlock = document.getElementsByClassName('cd-product-wrapper')[0];
var showResults = document.createElement('div');
showResults.setAttribute('class', 'info-block');
var showdet = consolBlock.appendChild(showResults);
showResults.textContent = 'Total for room: 0';
function showD(det) {
    var dett = det || 'empty';
    showResults.textContent = det;
}
//infoblock
var typeInv = {};
var showType = '';
function settTapeInv() {
    if (this.getAttribute('data-switch') !== 'yes') {
        typeInv[this.textContent] = this.textContent;
        this.setAttribute('data-switch', 'yes');
    }
    else {
        typeInv[this.textContent] = '';
        this.setAttribute('data-switch', 'now');
    }
    typeInvTogether(typeInv)
}
function typeInvTogether(typeInv) {
    showType = '';
    for (var prop in typeInv) {
        if (priceFull.hasOwnProperty(prop)) {
            showType += typeInv[prop] + ' ';
        }
    }
}
$('label[class*="service"]').click(settTapeInv);
var priceFull = {
    Facilitate: {state: 0},
    Save: {state: 0},
    Invest: {state: 0},
    //Facilitate:
    'Server (app inc.)': {name: 'Server (app inc.)', cost: 500, state: 0, Facilitate: true},
    //Save:
    'Control Board': {name: 'Control Board', cost: 400, state: 0, Save: true},
    'Door Sensor': {name: 'Door Sensor', cost: 150, state: 0, Save: true},
    'Ceiling motions sensors': {name: 'Ceiling motions sensors', cost: 400, state: 0, Save: true},
    //Invest:
    'Control Tablet (app. inc.)': {name: 'Control Tablet (app. inc.)', cost: 1000, state: 0, Invest: true},
    'Thermostat (coming soon)': {name: 'Thermostat (coming soon)', cost: 0, state: 0, Invest: true},
    '2-ch Light Control': {name: '2-ch Light Control', cost: 250, state: 0, Invest: true},
    'Curtains Control (motors inc.)': {name: 'Curtains Control (motors inc.)', cost: 900, state: 0, Invest: true},
    'Front Door Camera': {name: 'Front Door Camera', cost: 400, state: 0, Invest: true},
    'Do not disturb electronic sign': {name: 'Do not disturb electronic sign', cost: 450, state: 0, Invest: true},
    'TV Media Centre (coming soon)': {name: 'TV Media Centre (coming soon)', cost: 0, state: 0, Invest: true}
};
var counterPage = {
    start: true,
    listRawPrice: '',
    rawPrice: 0,
    totalPrice: 0,
    warrantyPeriod: 2,
    warrantySumm: 0,
    warrantyPercent: 0.3,
    discount: 0,
    discountSumm: 0,
    fullSumm: 0
};

var priceInvestValue = {};
function summItemsPrice(priceValue) {
    var summTotal = 0;
    for (var prop in priceValue) {
        if (priceFull.hasOwnProperty(prop)) {
            if (priceValue[prop].name !== undefined && priceValue[prop].cost !== 0 && priceValue[prop].state == 1) {
                summTotal += priceValue[prop].cost;
            }
        }
    }
    counterPage.rawPrice = summTotal;
}

function writeRawItems(write) {
    var rawTotal = '';
    for (var prop in write) {
        if (priceFull.hasOwnProperty(prop)) {
            if (write[prop].name !== undefined && write[prop].cost !== 0 && write[prop].state == 1) {
                rawTotal += write[prop].name.toString() + ', ';
            }
        }
    }
    counterPage.listRawPrice = rawTotal;
}
var showprice = '';
function showSumms(brack) {
    var bracker = brack || '\r\n';
    var showinfo = document.querySelectorAll('.info');
    var showMuch = document.querySelectorAll('.summ');
    var i;
    for (i = 0; i < showMuch.length; i++) {
        showprice = showprice + bracker + showinfo.item(i).textContent + '  ' + showMuch.item(i).textContent + bracker;
    }
}
function deletePosition(event) {
    var whatRawNumb = $(this).attr('data-number');
    delete rawInfo[whatRawNumb];
    // whatRawNumb = 0;
    calcTotalSumm(rawInfo);
    var el = event.target;
    var totalPrice = document.getElementById('totalPrice');
    totalPrice.textContent = counterPage.totalPrice;
    el.parentNode.parentNode.removeChild(el.parentNode);
    $('#add-promo').attr('class', 'show');
}

var summ = '';

var rawInfoNumber = 0;
var rawInfo = [];
function createRaw(num, quantity, roomTypeFactor) {
    var summaryRaw = counterPage.rawPrice * quantity * roomTypeFactor;
    rawInfo[num] = {
        orderNumber: num,
        listItems: counterPage.listRawPrice,
        rawSumm: summaryRaw
    };
}
function calcTotalSumm(raw) {
    var total = 0;
    for (var prop in raw) {
        total += raw[prop].rawSumm;
    }
    counterPage.totalPrice = total;
}
function calcFieldSumm(obj, group, hider) {
    var total = 0;
    for (var prop in priceFull) {
        if (priceFull[prop]['Invest']) total += priceFull[prop].cost;
    }
    priceFull.Invest.state = 0;
    $(hider).attr('id', '');
}
var serviceQuanty = false;
var contentModal;
function hideModal() {
    $('.modal-dialog').attr('id', 'modal-hide');
}
$('button.close').click(hideModal);
function reloadModal() {
    window.location = '/';
}
$('button.reload').click(reloadModal);
var number = false;
var addPress = false;
function addFields() {
    var container3 = document.getElementById("2room").value;
    //MJ
    var roomsWithinSuite = 0;

    switch (container3) {
        case '1 bedroom + living room suite':
            roomsWithinSuite = 1;
            break;
        case '2 bedroom + living room suite':
            roomsWithinSuite = 2;
            break;
        case '3 bedroom + living room suite':
            roomsWithinSuite = 3;
            break;
        case '4 bedroom + living room suite':
            roomsWithinSuite = 4;
            break;
        case '5 bedroom + living room suite':
            roomsWithinSuite = 5;
            break;
        default:
            roomsWithinSuite = 1;

    }
    //MJ end
    var container3 = document.getElementById("2room").value;
    number = parseInt(document.getElementById("quanty").value);
    document.getElementById("quanty").value = 0;
    if (!number || number == 0 || counterPage.rawPrice == 0) {
        if (number == 0) contentModal = 'Please choice quanty';
        if (!number) contentModal = 'Please type quanty';
        if (counterPage.rawPrice == 0) contentModal = 'Please click to Service or Controllers buttons';
        var infoShow = $('.modal-dialog').attr('id', '');
        var textInfo = infoShow.find('.modal-body');
        textInfo.text(contentModal);
        return false;
    }
    else {
        var container2 = document.getElementById("2room").parentNode;
        var container2Papa = document.createElement('div');
        var deleteBotton = document.createElement('div');
        container2.appendChild(container2Papa);
        var infoLine = document.createElement('span');
        infoLine.setAttribute('class', 'info');
        container2Papa.appendChild(infoLine).textContent = "Type: " + container3 + ", quanty: " + number + " " + counterPage.listRawPrice + " Summ: " + showType + ' -';
        var contChild = document.createElement('span');
        contChild.setAttribute("class", "summ");
        container2Papa.setAttribute("class", "container");
        container2Papa.appendChild(deleteBotton);
        deleteBotton.setAttribute("class", "deletePosition");
        deleteBotton.setAttribute("data-number", rawInfoNumber);
        deleteBotton.textContent = 'Delete';
        deleteBotton.addEventListener('click', deletePosition, true);
        counterPage.rawPriceSumm = counterPage.rawPrice * number * roomsWithinSuite;
        createRaw(rawInfoNumber, number, roomsWithinSuite); //original function modified
        calcTotalSumm(rawInfo);
        summItemsPrice(priceFull);
        // calcFieldSumm(counterPage, 'warrantySumm');
        rawInfoNumber++;
        contChild.textContent = counterPage.rawPriceSumm;
        container2Papa.appendChild(contChild);
        var totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = counterPage.totalPrice;
        showSumms();

        counterPage.fullSumm = counterPage.totalPrice + counterPage.warrantySumm;

        function warranty() {
            $('#add-promo').attr('class', 'show').value = '';
            if (counterPage.warrantyPeriod == 2) {
                counterPage.warrantyPeriod = 5;
                counterPage.warrantySumm = counterPage.totalPrice * counterPage.warrantyPercent;
                counterPage.fullSumm = counterPage.totalPrice + counterPage.warrantySumm;
                document.getElementById('totalPrice').textContent = counterPage.fullSumm;
            }
            else {
                counterPage.warrantyPeriod = 2;
                counterPage.fullSumm = counterPage.totalPrice;
                document.getElementById('totalPrice').textContent = counterPage.fullSumm;
            }
            calcTotalSumm(rawInfo);
        }

        if (counterPage.start)  $('#warranty').click(warranty);

        $('.hide').attr('class', 'show');
        var discount = 30;

        function setPromo() {
            discount = event.target.value;
        }

        $('#choice-option').click(setPromo);
        var promoCode = {
            'NOINSTALLAB213': 23,
            'PFFSD432423213': 5,
            'FDSF23423FDS23': 10
        };
        var promoCodeInput = '';

        function addPromo() {
            calcTotalSumm(rawInfo);
            if ($('#add-promo')["0"].value == '' || !promoCode.hasOwnProperty(promoCodeInput)) {
                $('#add-promo').attr('class', 'show');
                counterPage.discountSumm = counterPage.fullSumm * counterPage.discount;
                counterPage.summAfterDisount = counterPage.fullSumm + counterPage.discountSumm;
                $('.update').remove();
                $('#totalPrice').append('<span class="warranty-summ green update"> - ' + counterPage.discount * 100 + '% </span><span class="update"> = ' + counterPage.summAfterDisount + '</span>');
                counterPage.discount = 0;
                contentModal = 'Please enter valid Promo code';
                var infoShow = $('.modal-dialog').attr('id', '');
                var textInfo = infoShow.find('.modal-body');
                textInfo.text(contentModal);
                return false;
                return;
            }
            if (promoCode.hasOwnProperty(promoCodeInput)) {
                discount = promoCode[promoCodeInput];
                $('#add-promo').attr('class', 'show valid');
                counterPage.discount = discount * 0.01;
                counterPage.discountSumm = counterPage.fullSumm * counterPage.discount;
                counterPage.summAfterDisount = counterPage.fullSumm - counterPage.discountSumm;
                $('.update').remove();
                $('#totalPrice').append('<span class="warranty-summ green update"> - ' + counterPage.discount * 100 + '% </span><span class="update"> = ' + counterPage.summAfterDisount + '</span>');
                counterPage.discount = 0;
                return;
            }
            else {
                contentModal = 'Please enter valid Promo code';
                var infoShow = $('.modal-dialog').attr('id', '');
                var textInfo = infoShow.find('.modal-body');
                textInfo.text(contentModal);
            }
            $('#add-promo')["0"].value = '';
        }

        if (typeof counterPage.addPromo == 'undefined') {
            $('#add-promo-code').click(addPromo);
            counterPage.addPromo = '';
        }
        function testInputPromo() {
            promoCodeInput = this.value;
        }

        function testInputPromoPress() {
            if (event.keyCode == 32) {
                contentModal = 'Pleace remove a white space';
                var infoShow = $('.modal-dialog').attr('id', '');
                var textInfo = infoShow.find('.modal-body');
                textInfo.text(contentModal);
            }
        }

        $('#add-promo').change(testInputPromo);
        if (counterPage.start) $('#add-promo').keypress(testInputPromoPress);
        counterPage.start = false;
    }
    serviceQuanty = true;
    addPress = true;
}

jQuery(document).ready(function ($) {
    //open interest point description
    $('.cd-single-point').children('a').on('click', function () {
        var selectedPoint = $(this).parent('li');
        if (selectedPoint.hasClass('is-open')) {
            selectedPoint.removeClass('is-open').addClass('visited');
        } else {
            selectedPoint.addClass('is-open').siblings('.cd-single-point.is-open').removeClass('is-open').addClass('visited');
        }
    });
    //close interest point description
    $('.cd-close-info').on('click', function (event) {
        event.preventDefault();
        $(this).parents('.cd-single-point').eq(0).removeClass('is-open').addClass('visited');
    });
});


$(document).ready(function () {
    //called when key is pressed in textbox
    $("#quanty").keypress(function (e) {
        //if the letter is not digit then display error and don't type anything
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            //display error message
            $("#errmsg").html("Please use digits only").show().delay(1000).fadeOut("slow");
            return false;
        }
    });
});


/*
 This source is shared under the terms of LGPL 3
 www.gnu.org/licenses/lgpl.html

 You are free to use the code in Commercial or non-commercial projects
 */

//Set up an associative array
//The keys represent the size of the cake
//The values represent the cost of the cake i.e A 10" cake cost's $35


//Set up an associative array
//The keys represent the filling type
//The value represents the cost of the filling i.e. Lemon filling is $5,Dobash filling is $9
//We use this this array when the user selects a filling from the form
var container2 = [];
var container3 = [];
container2["Living Room1"] = 120;
container2["Living Room1"] = 500;
container2["Living Room1"] = 1000;
container2["Living Room1"] = 1500;

function activateCollPr0() {
    $('label.inlinelabel0').attr('id', 'inlinelabel0');
    $('label.inlinelabel1').attr('id', 'inlinelabel1');
    $('label.inlinelabel2').attr('id', 'inlinelabel2');
    $('#ControllersMap0').attr('style', 'display:block');
    $('#ControllersMap1').attr('style', 'display:block');
    $('#ControllersMap2').attr('style', 'display:block');
}

function deActivateCollPr0() {
    $('label.inlinelabel0').attr('id', '');
    $('label.inlinelabel1').attr('id', '');
    $('label.inlinelabel2').attr('id', '');
    $('#ControllersMap0').attr('style', 'display:none');
    $('#ControllersMap1').attr('style', 'display:none');
    $('#ControllersMap2').attr('style', 'display:none');
}

function save() {
    if (priceFull.Save.state == 0) {
        priceFull.Save.state = 1;
        priceFull['Control Board'].state = 1;
        priceFull['Door Sensor'].state = 1;
        priceFull['Ceiling motions sensors'].state = 1;

        summItemsPrice(priceFull);
        writeRawItems(priceFull);

        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        activateCollPr0();
    }
    else {
        priceFull.Save.state = 0;
        priceFull['Control Board'].state = 0;
        priceFull['Door Sensor'].state = 0;
        priceFull['Ceiling motions sensors'].state = 0;

        summItemsPrice(priceFull);
        writeRawItems(priceFull);

        this.setAttribute('id', '');

        deActivateCollPr0();
    }
    showD('Total for room: ' + counterPage.rawPrice);
}
$('.service1').click(save);

function activateCollPr1() {
    $('label.inlinelabel3').attr('id', 'inlinelabel3');
    $('#ControllersMap3').attr('style', 'display:block');
}

function deActivateCollPr1() {
    $('label.inlinelabel3').attr('id', '');
    $('#ControllersMap3').attr('style', 'display:none');
}

function facilitate() {
    if (priceFull.Facilitate.state == 0) {
        priceFull.Facilitate.state = 1;
        priceFull['Server (app inc.)'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        activateCollPr1();
    }
    else {
        priceFull.Facilitate.state = 0;
        priceFull['Server (app inc.)'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        deActivateCollPr1();
    }
    showD('Total for room: ' + counterPage.rawPrice);
}
$('.service0').click(facilitate);


function activateCollPr2() {
    $('label.inlinelabel4').attr('id', 'inlinelabel4');
    $('label.inlinelabel5').attr('id', 'inlinelabel5');
    $('label.inlinelabel6').attr('id', 'inlinelabel6');
    $('label.inlinelabel7').attr('id', 'inlinelabel7');
    $('label.inlinelabel8').attr('id', 'inlinelabel8');
    $('label.inlinelabel9').attr('id', 'inlinelabel9');
    $('label.inlinelabel10').attr('id', 'inlinelabel10');
    $('#ControllersMap4').attr('style', 'display:block');
    $('#ControllersMap5').attr('style', 'display:block');
    $('#ControllersMap6').attr('style', 'display:block');
    $('#ControllersMap7').attr('style', 'display:block');
    $('#ControllersMap8').attr('style', 'display:block');
    $('#ControllersMap9').attr('style', 'display:block');
}

function deActivateCollPr2() {
    $('label.inlinelabel4').attr('id', '');
    $('label.inlinelabel5').attr('id', '');
    $('label.inlinelabel6').attr('id', '');
    $('label.inlinelabel7').attr('id', '');
    $('label.inlinelabel8').attr('id', '');
    $('label.inlinelabel9').attr('id', '');
    $('label.inlinelabel10').attr('id', '');
    $('#ControllersMap4').attr('style', 'display:none');
    $('#ControllersMap5').attr('style', 'display:none');
    $('#ControllersMap6').attr('style', 'display:none');
    $('#ControllersMap7').attr('style', 'display:none');
    $('#ControllersMap8').attr('style', 'display:none');
    $('#ControllersMap9').attr('style', 'display:none');
}

function invest() {
    if (priceFull.Invest.state == 0) {
        priceFull.Invest.state = 1;
        priceFull['Control Tablet (app. inc.)'].state = 1;
        priceFull['Thermostat (coming soon)'].state = 1;
        priceFull['2-ch Light Control'].state = 1;
        priceFull['Curtains Control (motors inc.)'].state = 1;
        priceFull['Front Door Camera'].state = 1;
        priceFull['Do not disturb electronic sign'].state = 1;
        priceFull['TV Media Centre (coming soon)'].state = 1;

        summItemsPrice(priceFull);
        writeRawItems(priceFull);

        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        activateCollPr2();
    }
    else {
        priceFull.Invest.state = 0;
        priceFull['Control Tablet (app. inc.)'].state = 0;
        priceFull['Thermostat (coming soon)'].state = 0;
        priceFull['2-ch Light Control'].state = 0;
        priceFull['Curtains Control (motors inc.)'].state = 0;
        priceFull['Front Door Camera'].state = 0;
        priceFull['Do not disturb electronic sign'].state = 0;
        priceFull['TV Media Centre (coming soon)'].state = 0;

        summItemsPrice(priceFull);
        writeRawItems(priceFull);

        this.setAttribute('id', '');
        deActivateCollPr2();
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.service2').click(invest);

function collectControllers0() {
    if (priceFull['Control Board'].state == 0) {
        priceFull['Control Board'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap0').attr('style', 'display:block');
    }
    else {
        priceFull['Control Board'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap0').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel0').click(collectControllers0);

function collectControllers1() {
    if (priceFull['Door Sensor'].state == 0) {
        priceFull['Door Sensor'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap1').attr('style', 'display:block');
    }
    else {
        priceFull['Door Sensor'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap1').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel1').click(collectControllers1);

function collectControllers2() {
    if (priceFull['Ceiling motions sensors'].state == 0) {
        priceFull['Ceiling motions sensors'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap2').attr('style', 'display:block');
    }
    else {
        priceFull['Ceiling motions sensors'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap2').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel2').click(collectControllers2);

function collectControllers3() {
    if (priceFull['Server (app inc.)'].state == 0) {
        priceFull['Server (app inc.)'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap3').attr('style', 'display:block');
    }
    else {
        priceFull['Server (app inc.)'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap3').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel3').click(collectControllers3);

function collectControllers4() {
    if (priceFull['Control Tablet (app. inc.)'].state == 0) {
        priceFull['Control Tablet (app. inc.)'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap4').attr('style', 'display:block');
    }
    else {
        priceFull['Control Tablet (app. inc.)'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap4').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel4').click(collectControllers4);

function collectControllers5() {
    if (priceFull['Thermostat (coming soon)'].state == 0) {
        priceFull['Thermostat (coming soon)'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap5').attr('style', 'display:block');
    }
    else {
        priceFull['Thermostat (coming soon)'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap5').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel5').click(collectControllers5);

function collectControllers6() {
    if (priceFull['2-ch Light Control'].state == 0) {
        priceFull['2-ch Light Control'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap6').attr('style', 'display:block');
    }
    else {
        priceFull['2-ch Light Control'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap6').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel6').click(collectControllers6);

function collectControllers7() {
    if (priceFull['Curtains Control (motors inc.)'].state == 0) {
        priceFull['Curtains Control (motors inc.)'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap7').attr('style', 'display:block');
    }
    else {
        priceFull['Curtains Control (motors inc.)'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap7').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel7').click(collectControllers7);

function collectControllers8() {
    if (priceFull['Front Door Camera'].state == 0) {
        priceFull['Front Door Camera'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap8').attr('style', 'display:block');
    }
    else {
        priceFull['Front Door Camera'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap8').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel8').click(collectControllers8);

function collectControllers9() {
    if (priceFull['Do not disturb electronic sign'].state == 0) {
        priceFull['Do not disturb electronic sign'].state = 1;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        var attrib = this.getAttribute('class');
        this.setAttribute('id', attrib);
        $('#ControllersMap9').attr('style', 'display:block');
    }
    else {
        priceFull['Do not disturb electronic sign'].state = 0;
        summItemsPrice(priceFull);
        writeRawItems(priceFull);
        this.setAttribute('id', '');
        $('#ControllersMap9').attr('style', 'display:none');
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel9').click(collectControllers9);

function collectControllers10() {
    {
        if (priceFull['TV Media Centre (coming soon)'].state == 0) {
            priceFull['TV Media Centre (coming soon)'].state = 1;
            summItemsPrice(priceFull);
            writeRawItems(priceFull);
            var attrib = this.getAttribute('class');
            this.setAttribute('id', attrib);
            $('#ControllersMap10').attr('style', 'display:block');
        }
        else {
            priceFull['TV Media Centre (coming soon)'].state = 0;
            summItemsPrice(priceFull);
            writeRawItems(priceFull);
            this.setAttribute('id', '');
            $('#ControllersMap10').attr('style', 'display:none');
        }
    }
    showD('Total for room: ' + counterPage.rawPrice);
}

$('.inlinelabel10').click(collectControllers10);

var userHasFilled = {};

function isAllFilled() {
    userHasFilled['"' + this.getAttribute('id') + '"'] = {
        text: this.value,
        idName: this.getAttribute('id'),
        rule: this.getAttribute('pattern'),
        whatFilled: this,
        valid: false
    };
    isTrust();
}
function isTrust() {
    for (var prop in userHasFilled) {
        var str = '"' + userHasFilled[prop].text + '"';
        var regexp = userHasFilled[prop].rule;
        var result = str.match(regexp);
        if (result) userHasFilled[prop].valid = true;
    }
}
var fullTime = '';
function addTime() {
    var currentTime = new Date();
    var currentDay = currentTime.getDate();
    var currentMonth = parseInt(currentTime.getMonth() + 1);
    var currentYear = currentTime.getFullYear();
    fullTime = currentDay + ' . ' + currentMonth + ' . ' + currentYear;
}
$('#filldetails').click(addFields);
function printFile() {
    window.print();
}

var choiceWasMade = true;
function closer() {
    showprice = '';
    showSumms();
    $(this.parentNode).remove();
    choiceWasMade = true;
    $('.dont-print-no-show').attr('class', 'dont-print-no');
    $('#please-choice').remove();
}

function closerForm() {
    $('body').attr('class', '');
    $(this.parentNode).remove();
    $(this).click(closer);
}

var letterWasSanding = false;
var allFieldsFilled = false;
var filledFields = {};
function canItSubmit() {
    var countField = 0;
    for (var prop in userHasFilled) {
        if (userHasFilled[prop]) {
            if (userHasFilled[prop].valid) {
                userHasFilled[prop].whatFilled.setAttribute('class', 'filled');
                filledFields[prop] = userHasFilled[prop].whatFilled;
                countField++;
            }
            else {
                userHasFilled[prop].whatFilled.setAttribute('class', 'not-filled');
            }
        }
    }
    if (countField == 4) {
        console.log('Inv submit');
        allFieldsFilled = true;
    }
    else {
        console.log('Inv not submit');
    }
}

function sendToEmail() {
    event.preventDefault();
    $('body').attr('class', 'submit');
    canItSubmit();
    if (!allFieldsFilled) {
        contentModal = "Please fill all fields";
        var infoShow = $('.modal-dialog').attr('id', '');
        var textInfo = infoShow.find('.modal-body');
        textInfo.text(contentModal);
        return false;
    }
    if (letterWasSanding) {
        contentModal = "Invoice was sending.Please press button 'x' or press button 'r' for reload the page and repeat all actions for creating a new from start to end";
        var infoShow = $('.modal-dialog').attr('id', '');
        var textInfo = infoShow.find('.modal-body');
        textInfo.text(contentModal);
        return false;
    }
    if (!letterWasSanding) {
        var whatToSend = '';
        for (var prop in filledFields) {
            whatToSend += '<div class="' + filledFields[prop].getAttribute('placeholder') + '">' + filledFields[prop].getAttribute('placeholder') + filledFields[prop].value + '</div>';
        }
        whatToSend += document.querySelectorAll('.what-to-send').item(0).outerHTML;
        var nameSender = document.querySelectorAll('#name-sender').item(0).value; // Name of sender
        var emailSender = 'michburz@icloud.com';
        var emailWhoIsCreatingInvoice = 'michburz@icloud.com';
        // window.location.hostname == 'archiwum.zip' ? emailSender = 'xapaktepnik@meta.ua' : emailSender = 'michburz@icloud.com';
        // window.location.hostname == 'archiwum.zip' ? emailWhoIsCreatingInvoice = 'xapaktepnik@meta.ua' : emailWhoIsCreatingInvoice = 'michburz@icloud.com';
        $.ajax({
            type: 'POST',
            url: 'php/email.php',
            data: {
                'fromEmail': emailWhoIsCreatingInvoice,
                'toEmail': emailSender,
                'name': nameSender,
                'html': whatToSend
            }
        }).done(function (response) {
            contentModal = 'Your pro forma is sent to us, we will contact you soon. Thank you!';
            var infoShow = $('.modal-dialog').attr('id', '');
            var textInfo = infoShow.find('.modal-body');
            textInfo.text(contentModal);
            return false;
        });
        letterWasSanding = true;
    }
    console.log(whatToSend);
}
var itCanSend = false;

var addInvoiceData = false;
function mailPrepering() {
    if (addInvoiceData) {
        contentModal = "Invoice was creating. Please press button 'x' or press button 'r' for reload the page and repeat all actions for creating a new from start to end";
        var infoShow = $('.modal-dialog').attr('id', '');
        var textInfo = infoShow.find('.modal-body');
        textInfo.text(contentModal);
        return false;
    }
    else {
        showprice = '';
        showSumms();
        $('body').append('<form id="prepare">' +
            '<span class="close-form">X</span>' +
            '<input id="name-sender" type="text" placeholder="Name: " class="name" pattern="[A-Za-z]{4,100}" title="Name must contain at least 4 or more letters" autocomplete="off">' +
            '<input id="hotel-name" type="text" placeholder="Hotel name and address: " class="name" pattern="[A-Za-z]{4,500}" title="Hotel name and address must contain at least 4 or more letters" autocomplete="off">' +
            '<input id="phone-number" type="text" placeholder="Phone number: " class="name" pattern="[0-9]{7,20}" title="Name must contain at least 7 or more letters" autocomplete="off">' +
            '<input id="email" type="text" placeholder="Email: " class="name" pattern="[A-Za-z]{4,100}" title="Name must contain at least 4 or more letters" autocomplete="off">' +
            '<button class="send" value="Send">Send</button></form>');
        $('#name-sender').blur(isAllFilled);
        $('#hotel-name').blur(isAllFilled);
        $('#phone-number').blur(isAllFilled);
        $('#email').blur(isAllFilled);
        $('#prepare .send').click(sendToEmail);
        $('.close-form').click(closerForm);
        addInvoiceData = true;
    }
}

var printcontent;
$('.progress-button').click(letChoice);
var testIfAddListener = {};

function letChoice() {
    if (!serviceQuanty || counterPage.totalPrice == 0) {
        if (number == 0) contentModal = 'Please choice quanty';
        if (!number) contentModal = 'Please type quanty';
        if (counterPage.rawPrice == 0) contentModal = 'Please click to Service or Controllers buttons';
        if (!addPress) contentModal = 'Please click ADD buttton';
        var infoShow = $('.modal-dialog').attr('id', '');
        var textInfo = infoShow.find('.modal-body');
        textInfo.text(contentModal);
        return false;
    }
    if (testIfAddListener.invoice !== 'undefined') {
        $('#please-choice').remove();
        testIfAddListener.invoice = 1;
    }

    testIfAddListener.invoice = 1;
    if (testIfAddListener.invoice == 1) $('#please-choice').remove();
    testIfAddListener.invoice = 1;
    showprice = '';
    showSumms('<br>');
    printcontent = showprice;
    var totalPrice = document.getElementById('totalPrice');
    addTime();
    var body = $('body');
    $('.dont-print-no').attr('class', 'dont-print-no-show');
    var percent = '';
    counterPage.warrantyPeriod == 2 ? percent = '' : percent = ' (+30%)';
    $('body').append('<div id="please-choice" class="print-show"><div class="what-to-send"' +
        '<img class="logo print-show" src="../img/logo.png">' +
        '<time class="current-date print-show">Date: ' + fullTime + '' + '</time>' +
        '<h1 class="head print-show">Summary:</h1>' +
        '<p class="price print-show">' + showprice + '</p>' +
        '<div class="years3warranty print-show">' + counterPage.warrantyPeriod + ' Years Warranty' + percent + '</div>' +
        '<strong class="print print-show">Total price is: SAR ' + totalPrice.textContent + '</strong></div>' +
        '<p class="print">Print</p>' +
        '<p class="send print-show">Submit</p>' +
        '<p class="close print-show">X</p></div>');
    $('.print').click(printFile);
    if (!choiceWasMade) {
        contentModal = 'Your choice made';
        var infoShow = $('.modal-dialog').attr('id', '');
        var textInfo = infoShow.find('.modal-body');
        textInfo.text(contentModal);
        return false;
    }
    if (choiceWasMade) {
        $('.send').click(mailPrepering);
        choiceWasMade = false;
    }
    $('.close.print-show').click(closer);
}
var lazyStyle = {
    old: 'css/demo.css',
    new: 'css/test.css',
    workerLink: '',
    change: function () {
        lazyStyle.workerLink = lazyStyle.workerLink || lazyStyle.old;
        $('link[href="' + lazyStyle.workerLink + '"]').attr('href', lazyStyle.new);
    }
};