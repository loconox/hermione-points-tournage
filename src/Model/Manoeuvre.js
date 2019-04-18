export default class Manoeuvre {
	constructor(id, name, family, sail) {
		this._id = id;
		this._name = name;
		this._family = family;
		this._sail = sail;
	}

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get family() {
		return this._family;
	}

	get sail() {
		return this._sail;
	}
}