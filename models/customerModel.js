export default class CustomerModel {
    constructor(cusId, cusName, cusContact, cusAddress) {
        this._cusId = cusId;
        this._cusName = cusName;
        this._cusContact = cusContact;
        this._cusAddress = cusAddress;
    }

    get cusId() {
        return this._cusId;
    }

    set cusId(value) {
        this._cusId = value;
    }

    get cusName() {
        return this._cusName;
    }

    set cusName(value) {
        this._cusName = value;
    }

    get cusContact() {
        return this._cusContact;
    }

    set cusContact(value) {
        this._cusContact = value;
    }

    get cusAddress() {
        return this._cusAddress;
    }

    set cusAddress(value) {
        this._cusAddress = value;
    }
}
