import { itemArray } from "../db/database.js";
import itemModel from "../models/itemModel.js";
import { setAlert } from "../util/alert.js";
import { PRICE, QTY } from "../util/regex.js";

const itemBody = $(".item-table-body");
nextItemId().addClass('disabled-input');

//Add Item
$(".item-save").on("click", function () {
    if (validationItemInputs()) {
        let item = new itemModel(
            $("#item-code").val(),
            $("#item-name").val(),
            $("#item-price").val(),
            $("#item-qty").val()
        );
        itemArray.push(item);
        loadItemData();
        setAlert("success", "Inventory successfully saved");
        console.log(item);
        clearInputs();
        nextItemId();
    }
});

//Search Item On Click
$(".item-search-button").on("click", function () {
    searchItem();
});

//Search Item On keypress
$("#search-item").on("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        searchItem();
    }
});

//Update Item
$(".item-update").on("click", function() {
    if (validationItemInputs()) {
        let updateId = $("#item-code").val();

        let index = itemArray.findIndex(item => item.itemCode === updateId);

        if (index !== -1) {
            itemArray[index].itemName = $("#item-name").val();
            itemArray[index].itemPrice = $("#item-price").val();
            itemArray[index].itemQty = $("#item-qty").val();

            loadItemData();
            setAlert('success', 'Inventory updated successfully!');
            clearInputs();
            nextItemId();
            $(".item-save").removeClass('disabled-button');
        } else {
            setAlert("error", "Item not found!");
            clearInputs();
            nextItemId();
            $(".item-save").removeClass('disabled-button');
        }
    }
});

//Delete Item
$(".item-delete").on("click", function() {
    let deletedId = $("#item-code").val();
    let index = itemArray.findIndex(item => item.itemCode === deletedId);
    if (index !== -1) {
        itemArray[index].isDeleted = true;
        loadItemData();
        setAlert("success", "Inventory marked as deleted successfully!");
        clearInputs();
        nextItemId();
        $(".item-save").removeClass('disabled-button');
    } else {
        setAlert("error", "Item not found!");
    }
});

//Clear button clear inputs
$(".item-clear").on(
    "click" , function (){
        clearInputs();
        nextItemId();
        $(".item-save").removeClass('disabled-button');
    }
);

//Input Validation
let validationItemInputs = () => {
    let itemName = $("#item-name").val();
    let itemPrice = $("#item-price").val();
    let itemQty = $("#item-qty").val();

    if (itemName !== "") {
        if (PRICE.test(itemPrice)) {
            if (QTY.test(itemQty)) {
                return true;
            } else {
                setAlert("error", "Invalid Quantity !!");
                $("#item-qty").val("");
            }
        } else {
            setAlert("error", "Invalid Price !!");
            $("#item-price").val("");
        }
    } else {
        setAlert('error', 'Invalid Inventory Model !!');
        $("#item-name").val("");
    }
    return false;
};

//Show Table Data
export let loadItemData = () => {
    itemBody.children().remove();
    let activeItems = itemArray.filter(item => !item.isDeleted);
    activeItems.forEach((item) => {
        let data = `<tr><td>${item._itemCode}</td><td>${item._itemName}</td><td>${item._itemPrice}</td><td>${item._itemQty}</td></tr>`;
        itemBody.append(data);
    });
};

//Search Items Function
function searchItem() {
    let searchedId = $("#search-item").val();

    if (QTY.test(searchedId)) {
        let foundItem = itemArray.find(value => value.itemCode === searchedId);

        if (foundItem && !foundItem.isDeleted) {
            $("#item-code").val(foundItem.itemCode);
            $("#item-name").val(foundItem.itemName);
            $("#item-price").val(foundItem.itemPrice);
            $("#item-qty").val(foundItem.itemQty);
            $(".item-save").addClass('disabled-button');
        } else if (foundItem && foundItem.isDeleted) {
            setAlert('error', 'This item has been deleted');
            clearInputs();
            nextItemId();
        } else {
            setAlert('error', 'Item not found');
            clearInputs();
            nextItemId();
        }
    } else {
        setAlert('error', 'Invalid item ID');
        clearInputs();
        nextItemId();
    }
}

//Clear Inputs
function clearInputs(){
    $("#item-code").val("");
    $("#item-name").val("");
    $("#item-price").val("");
    $("#item-qty").val("");
    $("#search-item").val("");
}

//Generate Next ID
function nextItemId() {
    let nextItemId = itemArray.length + 1;
    return $("#item-code").val(nextItemId);
}
