export default class orderModel {
    constructor(orderId,customerId,orderDate,totalBill,itemList) {
        this._orderId = orderId;
        this._customerId = customerId;
        this._orderDate = orderDate;
        this._totalBill = totalBill;
        this._itemList = itemList;
    }
    get orderId() {
        return this._orderId;
    }

    set orderId(value) {
        this._orderId = value;
    }

    get customerId() {
        return this._customerId;
    }

    set customerId(value) {
        this._customerId = value;
    }

    get orderDate() {
        return this._orderDate;
    }

    set orderDate(value) {
        this._orderDate = value;
    }

    get totalBill() {
        return this._totalBill;
    }

    set totalBill(value) {
        this._totalBill = value;
    }

    get itemList() {
        return this._itemList;
    }

    set itemList(value) {
        this._itemList = value;
    }
}