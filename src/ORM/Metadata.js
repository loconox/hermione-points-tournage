export default class Metadata {

    constructor() {
        this._identifier = null;
        this._fields = [];
        this._class = null;
        this._associations = {};
    }


    get identifier() {
        return this._identifier;
    }

    addIdentifier(value) {
        this._identifier = value;

        return this;
    }

    get fields() {
        return this._fields;
    }

    addField(name) {
        this._fields.push(name);

        return this;
    }

    get class() {
        return this._class;
    }

    set class(value) {
        this._class = value;
    }

    get associations() {
        return this._associations;
    }

    addAssociation(fieldName, className) {
        this._associations[fieldName] = {
            'fieldName': fieldName,
            'class': className
        };

        return this;
    }
}