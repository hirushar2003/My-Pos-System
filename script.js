
let customerForm = $("#customer");
let itemForm = $("#item");
let orderForm = $("#order");
let container = $(".container");

// Initially display only the Customer section
customerForm.css("display", "block");
itemForm.css("display", "none");
orderForm.css("display", "none");

// Update display based on menu selection
function changeDisplay(customer, item, order) {
    customerForm.css("display", customer);
    itemForm.css("display", item);
    orderForm.css("display", order);
}

// Menu bar button click actions
$("#customer-btn-menu").on("click", function() {
    changeDisplay("block", "none", "none");
    myFunction(container[0]);
});

$("#item-btn-menu").on("click", function() {
    changeDisplay("none", "block", "none");
    myFunction(container[0]);
});

$("#order-btn-menu").on("click", function() {
    changeDisplay("none", "none", "block");
    myFunction(container[0]);
});

// Navigation bar button click actions
$("#nav-customer").on("click", function() {
    changeDisplay("block", "none", "none");
    changeStyle(0);
});

$("#nav-item").on("click", function() {
    changeDisplay("none", "block", "none");
    changeStyle(1);
});

$("#nav-order").on("click", function() {
    changeDisplay("none", "none", "block");
    changeStyle(2);
});

// Function to change the border style on the selected navigation item
function changeStyle(index) {
    let navItems = $(".nav-item");
    navItems.css("border", "none"); // Reset borders
    $(navItems[index]).css("borderBottom", "2px solid #0d6efd"); // Highlight selected
}
