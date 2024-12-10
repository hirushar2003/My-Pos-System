import { customerArray, itemArray, orderArray, orderItemArray } from "../db/database.js";


let cusCount = customerArray.length;
let itemCount = itemArray.length;
let orderCount = orderArray.length;

$(".lCus").text(cusCount);
$(".lItem").text(itemCount);
$(".lOrder").text(orderCount);

