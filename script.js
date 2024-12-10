let navBar = $(".page-navigation");
let dashBoardSection = $('#dash-board');
let customerSection = $('#customer');
let itemSection = $('#item');
let orderSection = $('#order');

navBar.css('display', 'block');
dashBoardSection.css('display', 'block');
customerSection.css('display', 'none');
itemSection.css('display', 'none');
orderSection.css('display', 'none');

function setSection(dashboard, customer, item, order, nav) {
    dashBoardSection.css("display", dashboard);
    customerSection.css("display", customer);
    itemSection.css("display", item);
    orderSection.css("display", order);
    navBar.css("display", nav);
}

$("#nav-dash").on(
    "click", function() {
       setSection("block", "none" , "none", "none", "block");
    });

$("#nav-cus").on(
    "click", function() {
        setSection("none", "block" , "none", "none", "block");
    }
);

$("#nav-item").on(
    "click", function() {
        setSection("none", "none" , "block", "none", "block");
    }
);

$("#nav-order").on(
    "click", function() {
        setSection("none", "none" , "none", "block", "block");
    }
);

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    if (header) {
        document.addEventListener('mousemove', (event) => {
            if (event.clientY <= 50) {
                header.classList.add('visible-header');
            } else {
                header.classList.remove('visible-header');
            }
        });
    } else {
        console.error("Header element not found!");
    }
});


