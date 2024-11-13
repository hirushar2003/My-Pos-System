export default class OrderItemModel{
    constructor(itemCode,qtyNeeded,itemName,itemPrice,totalPrice) {
        this._itemCode = itemCode;
        this._qtyNeeded = qtyNeeded;
        this._itemName = itemName;
        this._itemPrice = itemPrice;
        this._totalPrice = totalPrice;
    }

    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get qtyNeeded() {
        return this._qtyNeeded;
    }

    set qtyNeeded(value) {
        this._qtyNeeded = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get itemPrice() {
        return this._itemPrice;
    }

    set itemPrice(value) {
        this._itemPrice = value;
    }

    get totalPrice() {
        return this._totalPrice;
    }

    set totalPrice(value) {
        this._totalPrice = value;
    }
}