import Metadata from "../ORM/Metadata.js";

export default class TypePoint {
	constructor(id, nom) {
		this._id = id;
		this._nom = nom;
	}

	static get metadata() {
		let metadata = new Metadata();
		metadata.addIdentifier('id')
			.addField('nom')
			.setClass(TypePoint);

		return metadata;
	}

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get nom() {
        return this._nom;
    }

    set nom(value) {
        this._nom = value;
    }
}