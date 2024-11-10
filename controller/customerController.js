import CustomerModel from "../models/customerModel.js";
import {customerArray, itemArray} from "../db/database.js";
import {setAlert} from "../util/alert.js";
import {NAME, PRICE, QTY, TEL} from "../util/regex.js";

const customerBody = $(".customer-table-body");
nextCustomerId().addClass('disabled-input');

//Save Customer
$(".customer-save").on(
    "click" , function (){
        if (validationItemInputs()){
            let customer = new CustomerModel(
                $("#cus-id").val(),
                $("#cus-name").val(),
                $("#cus-con").val(),
                $("#cus-add").val()
            );
            customerArray.push(customer);
            setAlert('success', 'customer saved successfully');
            loadCustomerData();
            clearInputs();
            nextCustomerId();
        }
    }
);

//Search Customer OnClick
$(".customer-search-button").on(
    "click" , function (){
        searchCustomer();
    }
);

//Search Customer On Enter
$("#search-cus").on(
    "keydown" , function (event){
        if (event.key === "Enter") {
            event.preventDefault();
            searchCustomer();
        }
    }
)

// Customer Update
$(".customer-update").on("click", function() {
    if (validationItemInputs()) {
        let updateId = $("#cus-id").val();

        let index = customerArray.findIndex(customer => customer.cusId === updateId);

        if (index !== -1) {
            customerArray[index].cusName = $("#cus-name").val();
            customerArray[index].cusContact = $("#cus-con").val();
            customerArray[index].cusAddress = $("#cus-add").val();
            loadCustomerData();
            setAlert('success', 'Customer updated successfully!');
            clearInputs();
            nextCustomerId();
            $(".customer-save").removeClass('disabled-button');
        } else {
            setAlert("error", "Customer not found!");
            clearInputs();
            nextCustomerId();
            $(".customer-save").removeClass('disabled-button');
        }
    }
});

//Customer Delete
$(".customer-delete").on("click", function() {
    let deletedId = $("#cus-id").val();
    let index = customerArray.findIndex(customer => customer.cusId === deletedId);

    if (index !== -1) {
        customerArray[index].isDeleted = true;
        loadCustomerData();
        setAlert("success", "Customer marked as deleted successfully!");
        clearInputs();
        nextCustomerId();
        $(".customer-save").removeClass('disabled-button');
    } else {
        setAlert("error", "Customer not found!");
    }
});


//Customer search function
function searchCustomer() {
    let searchedId = $("#search-cus").val();

    if (searchedId !== "") {
        let foundCustomer = customerArray.find(value => value.cusId === searchedId);

        if (foundCustomer && !foundCustomer.isDeleted) {
            $("#cus-id").val(foundCustomer.cusId);
            $("#cus-name").val(foundCustomer.cusName);
            $("#cus-con").val(foundCustomer.cusContact);
            $("#cus-add").val(foundCustomer.cusAddress);
            $(".customer-save").addClass('disabled-button');
        } else if (foundCustomer && foundCustomer.isDeleted) {
            setAlert('error', 'This customer has been deleted');
            clearInputs();
            nextCustomerId();
        } else {
            setAlert('error', 'Customer not found');
            clearInputs();
            nextCustomerId();
        }
    } else {
        setAlert('error', 'Invalid customer contact number');
        clearInputs();
        nextCustomerId();
    }
}

//Generate next Customer ID
function nextCustomerId() {
    let nextCustomerId = customerArray.length + 1;
    return $("#cus-id").val(nextCustomerId);
}

//Clear Inputs
function clearInputs(){
    $("#cus-id").val("");
    $("#cus-name").val("");
    $("#cus-con").val("");
    $("#cus-add").val("");
}

//Input Validations
let validationItemInputs = () => {
    let customerName = $("#cus-name").val();
    let customerContact = $("#cus-con").val();

    if ($("#cus-id").val() !== ""){
        if (NAME.test(customerName)){
            if (TEL.test(customerContact)){
                return true;
            } else {
                setAlert('error' , 'Invalid contact format');
                $("#cus-con").val("");
            }
        } else {
            setAlert('error' , 'Invalid name format')
            $("#cus-name").val("");
        }
    } else {
        setAlert('error', 'Unable to save Customer');
        clearInputs();
        nextCustomerId();
    }
};

//Load Customer data on table
export let loadCustomerData = () => {
    customerBody.children().remove();
    let activeCustomers = customerArray.filter(customer => !customer.isDeleted);
    activeCustomers.forEach((customer) => {
        let data = `
            <tr>
                <td>${customer._cusId}</td>
                <td>${customer._cusName}</td>
                <td>${customer._cusContact}</td>
                <td>${customer._cusAddress}</td>
            </tr>
        `;
        customerBody.append(data);
    });
};

