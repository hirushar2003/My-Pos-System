import { customerArray, itemArray, orderArray, orderItemArray } from "../db/database.js";
import orderModel from "../models/orderModel.js";
import orderItemModel from "../models/orderItemModel.js";
import { setAlert } from "../util/alert.js";

getNewOrderId().addClass('disabled input');
const date = new Date();
const formattedDate = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
$("#order-date").text(formattedDate);
$('#customerIdList').change(function () {
    const selectedValue = $(this).val();
    const selectedCustomer = customerArray.find(customer => customer.cusId === selectedValue);
    if (selectedCustomer) {
        $("#order-customer-name").val(selectedCustomer.cusName);
    } else {
        setAlert('error', 'Cannot initiate customer details!');
    }
});

$('#itemCodeList').change(function () {
    const selectedValue = $(this).val();
    const selectedItem = itemArray.find(item => item.itemCode === selectedValue);
    if (selectedItem) {
        $("#order-item-name").val(selectedItem.itemName);
        $("#order-item-price").val(selectedItem.itemPrice);
        $("#order-item-qty").val(selectedItem.itemQty);
    } else {
        setAlert('error', 'Something went wrong');
    }
});

$("#btn-add-to-list").on("click", function () {
    if (validationOrderInputs()) {
        const orderItemCode = $("#itemCodeList").val();
        const qtyOrdered = $("#order-item-qty-need").val();
        const selectedItemName = $("#order-item-name").val();
        const selectedItemPrice = $("#order-item-price").val();
        const totalPrice = selectedItemPrice * qtyOrdered;

        let orderItem = new orderItemModel(orderItemCode, qtyOrdered, selectedItemName, selectedItemPrice, totalPrice);
        orderItem.hidden = false;
        orderItemArray.push(orderItem);
        console.log(orderItem);
        populateOrderTable();
        disableItemCode(orderItemCode);
        clearOrderInputs();
        getNewOrderId();
    }
});

$(document).on("click", ".btn-delete", function () {
    const rowIndex = $(this).closest("tr").data("index");
    orderItemArray[rowIndex].hidden = true;
    populateOrderTable();
    calculateBillAmount();
    clearOrderFinal();
});

$("#discount-bill").on("keyup", function () {
    let totalBill = $("#total-bill").val();
    let billDis = $("#discount-bill").val();
    $("#sub-total-bill").val(totalBill - billDis);
});

$("#cash-amount").on("keyup", function () {
    let subTotalBill = $("#sub-total-bill").val();
    let cashAmount = $("#cash-amount").val();
    $("#balance-bill").val(cashAmount - subTotalBill);
});

$(".btn-place-order").on("click", function () {
    const orderTableBody = $(".order-table-body");
    if (validationPlaceOrderInputs()) {
        let orderId = $("#order-id").val();
        let customerId = $("#customerIdList").val();
        let orderDate = $("#order-date").text();

        let itemList = orderItemArray.filter(item => !item.hidden).map(item => ({
            itemId: item.itemCode,
            itemName: item.itemName,
            qty: item.qtyNeeded,
            price: item.itemPrice,
            totalPrice: item.totalPrice
        }));

        let totalBill = parseFloat($("#sub-total-bill").val()) || 0;
        let newOrder = new orderModel(orderId, customerId, orderDate, totalBill, itemList);
        orderArray.push(newOrder);
        console.log(newOrder);
        console.log(newOrder.itemList[0]);

        setAlert('success', 'Order placed successfully!');

        // Optionally clear all inputs
        clearOrderInputs();
        clearOrderFinal();
        getNewOrderId();
        enableAllItemCodes();
        $("#customerIdList").val("");
        $("#total-bill").val("");
        orderTableBody.empty();
        reduceItemAmount();
    }
});

$(".btn-clear-all").on(
    "click" , function (){
        clearOrderInputs();
        clearOrderFinal();
        $("#total-bill").val("");
        enableAllItemCodes();
        let itb = $(".item-table-body");
        itb.empty();
    }
)
let validationOrderInputs = () => {
    const qtyOrdered = $("#order-item-qty-need").val();
    const selectedItemName = $("#order-item-name").val();
    const selectedCustomerName = $("#order-customer-name").val();
    const selectedItemAvailableQuantity = $("#order-item-qty").val();

    if (selectedCustomerName !== "") {
        if (selectedItemName !== "") {
            if (qtyOrdered !== "" || !qtyOrdered <= 0) {
                if (qtyOrdered < selectedItemAvailableQuantity) {
                    return true;
                } else {
                    setAlert('error', 'Not enough available quantity to process the order');
                }
            } else {
                setAlert('error', 'Select a quantity to order');
            }
        } else {
            setAlert('error', 'Please select the relevant item name');
        }
    } else {
        setAlert('error', 'Please select the relevant customer name');
    }
};

function populateOrderTable() {
    const orderTableBody = $(".order-table-body");
    orderTableBody.empty();

    orderItemArray.forEach((item, index) => {
        if (!item.hidden) {
            const row = `
                <tr data-index="${index}">
                    <td>${item.itemCode}</td>
                    <td>${item.itemName}</td>
                    <td>${item.itemPrice}</td>
                    <td>${item.qtyNeeded}</td>
                    <td>${item.totalPrice}</td>
                    <td><button class="btn-delete">Delete</button></td>
                </tr>
            `;
            orderTableBody.append(row);
            setAlert('success', 'Successfully added item to list');
            calculateBillAmount();
        }
    });
}

function calculateBillAmount() {
    let billAmount = 0;
    orderItemArray.forEach((item) => {
        if (!item.hidden) {
            billAmount += item.totalPrice;
        }
    });
    $("#total-bill").val(billAmount.toFixed(2));
    return billAmount;
}

function disableItemCode(itemCode) {
    $("#itemCodeList option").each(function () {
        if ($(this).val() === itemCode) {
            $(this).prop("disabled", true);
        }
    });
}

function enableAllItemCodes() {
    $("#itemCodeList option").each(function () {
        $(this).prop("disabled", false);
    });
}


function getNewOrderId() {
    let orderId = orderArray.length + 1;
    return $("#order-id").val(orderId);
}

function clearOrderInputs() {
    $("#order-item-qty-need").val("");
    $("#order-item-name").val("");
    $("#order-item-qty").val("");
    $("#itemCodeList").val("");
    $("#order-item-price").val("");
}

function clearOrderFinal(){
    $("#discount-bill").val("");
    $("#sub-total-bill").val("");
    $("#cash-amount").val("");
    $("#balance-bill").val("");
}

let validationPlaceOrderInputs = () => {
    if ($("#total-bill").val() !== ""){
        if ($("#discount-bill").val() !==""){
            if ($("#sub-total-bill").val() !== ""){
                if ($("#cash-amount").val() !==""){
                    if ($("#balance-bill").val() !==""){
                        return true;
                    }
                    else {
                        setAlert('error' , 'Invalid balance amount');
                    }
                } else {
                    setAlert('error' , 'Invalid cash amount');
                }
            } else {
                setAlert('error' , 'Invalid sub-total');
            }
        } else {
            setAlert('error' , 'Invalid discount');
        }
    } else {
        setAlert('error' , 'Invalid total bill amount');
    }
};

function reduceItemAmount() {
    orderItemArray.forEach(orderItem => {
        const itemCode = orderItem.itemCode;
        const qtyOrdered = parseInt(orderItem.qtyNeeded, 10);

        const itemInStock = itemArray.find(item => item.itemCode === itemCode);

        if (itemInStock) {
            const availableQty = parseInt(itemInStock.itemQty, 10);
            if (availableQty >= qtyOrdered) {
                itemInStock.itemQty = availableQty - qtyOrdered;
            } else {
                setAlert('error', `Not enough stock for item code: ${itemCode}`);
            }
        } else {
            setAlert('error', `Item code ${itemCode} not found in stock`);
        }
    });
}
