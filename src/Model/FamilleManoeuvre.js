import Metadata from "../ORM/Metadata.js";

export default class FamilleManoeuvre {
	constructor(id, name) {
		this._id = id;
		this._name = name;
	}

	static get metadata() {
		let metadata = new Metadata();
		metadata.addIdentifier('id')
			.addField('name')
			.setClass(FamilleManoeuvre);

		return metadata;
	}

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}